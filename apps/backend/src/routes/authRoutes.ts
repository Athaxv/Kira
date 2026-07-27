import bcrypt from "bcryptjs";
import { Router } from "express";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { validate } from "../middleware/validator";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { ConflictError } from "../errors/conflictError";
import { UnauthroizedError } from "../errors/unauthorizedError";

const router = Router()

const JWT_SECRET = process.env.SECRET!;

router.post('/register', validate(registerSchema), async (req, res) => {
    const { email, password } = req.body;

    const checkExistingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (checkExistingUser){
        throw new ConflictError("Email already registered")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashPassword
        }
    })

    console.log("User created: ", user);

    return res.status(201).json({
        success: true,
        message: "User registered Successfully"
    })

})

router.post("/login", validate(loginSchema), async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new UnauthroizedError("Invalid email or password")
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw new UnauthroizedError("Invalid email or password")
    }

    if (!JWT_SECRET){
        throw new Error("JWT secret is missing")
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "7d"
    })

    return res.status(200).json({
        success: true,
        data: {
            token
        }
    })
})

export default router;
import bcrypt from "bcryptjs";
import { Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router()

const JWT_SECRET = process.env.SECRET!;

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            return res.json({
                message: "send full user info!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        console.log("User created: ", user);

        return res.status(200).json({
            message: "User registered Successfully"
        })
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({
                message: "send full user info!"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.json({
                message: "No user found with this mail"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword){
            return res.status(404).json({
                message: "User password or mail may not be correct"
            })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "7d"
        })

        return res.status(200).json({
            token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default router;
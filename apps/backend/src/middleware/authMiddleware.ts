import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET!;

interface JwtPayload {
    userId: string;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decode = jwt.verify(token, JWT_SECRET)

        req.userId = decode.userId;

        return next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Internal error ocurred"
        })
    }
}
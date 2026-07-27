import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod/v4";

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success){
        return res.status(400).json({
            errors: result.error.flatten().fieldErrors
        })
    }

    req.body = result.data;

    next();
}
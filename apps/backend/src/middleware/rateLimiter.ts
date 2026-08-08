import { redis, tokenBucketScript } from "@repo/redis";
import type { NextFunction, Request, Response } from "express";

const capacity = 10;
const refillRate = 2;
const ttl = 60;

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;

    const key = `rate-limiter:${ip}`

    const result = await redis.eval(
        tokenBucketScript,
        1,
        key,
        capacity,
        refillRate,
        Date.now(),
        ttl
    )

    if (result === 1) {
        return next();
    }

    return res.status(429).json({
        message: "Too many request. Try again later!"
    })
}

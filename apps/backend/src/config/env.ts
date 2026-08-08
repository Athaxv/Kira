import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"])
                .default("development"),
    PORT: z.coerce.number().default(5000),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    REDIS_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"])
            .default("info")
})

export const env = envSchema.parse(process.env);

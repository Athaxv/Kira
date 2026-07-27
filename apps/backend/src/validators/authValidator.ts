import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().trim(),
    password: z.string().min(8, "Password must be alteast 8 characters")
})

export const loginSchema = z.object({
    email: z.string().trim(),
    password: z.string()
})

export type registerInput = z.infer<typeof registerSchema>
export type loginInput = z.infer<typeof loginSchema>
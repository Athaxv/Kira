import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().trim().min(1).max(50),
    description: z.string().trim(),
    severity: z.enum(["LOW", "MEDIUM", "HIGH"])
})

export type issueInput = z.infer<typeof issueSchema>
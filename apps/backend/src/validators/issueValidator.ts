import { z } from "zod";
import { Severity } from "../../../../packages/db/src/generated/prisma/enums";

export const issueSchema = z.object({
    title: z.string().trim().min(1).max(50),
    description: z.string().trim(),
    severity: z.enum(["LOW", "MEDIUM", "HIGH"])
})

export const getIssueSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(20).default(10),
    status: z.string().optional(),
    severity: z.enum([Severity.LOW, Severity.HIGH, Severity.MEDIUM]).optional(),
    search: z.string().optional()
})

export type issueInput = z.infer<typeof issueSchema>
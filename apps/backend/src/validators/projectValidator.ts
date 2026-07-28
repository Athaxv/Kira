import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string()
            .trim()
            .min(1, "Project title is required")
            .max(50, "Maximum 50 chars are allowed")
})

export const patchProjectSchema = z.object({
    title: z.string()
            .trim()
})

export type projectInput = z.infer<typeof createProjectSchema>
export type patchProjectInput = z.infer<typeof patchProjectSchema>
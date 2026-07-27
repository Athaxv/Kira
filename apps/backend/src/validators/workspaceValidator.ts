import { z } from "zod"

export const workspaceSchema = z.object({
    title: z.string().trim(),
})

export const addMembertoWorkspace = z.object({
    email: z.string().trim(),
})

export type workspaceInput = z.infer<typeof workspaceSchema> 
export type addMemberInput = z.infer<typeof addMembertoWorkspace>
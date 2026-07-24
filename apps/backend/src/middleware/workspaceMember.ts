import { prisma } from "@repo/db";
import type { NextFunction, Request, Response } from "express";

export async function requireWorkspaceMember(req: Request, res: Response, next: NextFunction){
    try {
        const { workspaceId } = req.params;
        const userId = req.userId;

        console.log("WorkspaceId: ", workspaceId)
        console.log("userId: ", userId)

        // if (userId || workspaceId){
        //     return res.status(401).json({
        //         message: "Unauthorized"
        //     })
        // }

        const workspaceMember = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId
                }
            }
        })

        if (!workspaceMember) {
            return res.status(403).json({
                message: "You are not a part of this workspace"
            })
        }

        req.workspaceMember = workspaceMember

        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
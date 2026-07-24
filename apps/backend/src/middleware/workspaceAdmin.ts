import type { NextFunction, Request, Response } from "express";

export async function workspaceAdmin(req: Request, res: Response, next: NextFunction){
    if (!req.workspaceMember) {
        return res.status(403).json({
            message: "You are not a workspace member"
        });
    }

    if (req.workspaceMember.role !== "ADMIN") {
        return res.status(403).json({
            message: "Only admins can perform this action"
        });
    }

    return next();
}
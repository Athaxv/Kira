import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";

const router = Router();

//create workspaces
router.post("/", authenticate, async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    try {
        const { title } = req.body;

        if (!title?.trim) {
            return res.status(401).json({
                message: "No body for workspace creation"
            })
        }

        // transaction
        const workspace = await prisma.$transaction(async (tx) => {
            const workspace = await tx.workspace.create({
                data: {
                    title: title.trim()
                }
            })
            await tx.workspaceMember.create({
                data: {
                    userId: userId,
                    role: "ADMIN",
                    workspaceId: workspace.id
                }
            })

            return workspace;
        })

        res.status(201).json({
            message: "Workspace created",
            workspace
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//add members to workspaces
router.post("/:workspaceId/members", authenticate, async (req, res) => {
    const userId = req.userId;

    try {
        const { workspaceId } = req.params;
        const { email } = req.body

        if (!email.trim()){
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const workspaceMember = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId
                }
            }
        })

        if (!workspaceMember){
            return res.status(403).json({
                message: "You not a member"
            })
        }

        if (workspaceMember?.role != 'ADMIN'){
            return res.status(403).json({
                message: "Only Admins"
            })
        }

        const checkUserExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!checkUserExist?.id){
            return res.status(404).json({
                message: "No user found"
            })
        }

        const checkUserWorkspace = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId: checkUserExist.id
                }
            }
        })

        if (checkUserWorkspace){
            return res.status(409).json({
                message: "User already present in the Workspace"
            })
        }

        await prisma.workspaceMember.create({
            data: {
                userId: checkUserExist.id,
                workspaceId: workspaceId
            }
        })

        return res.status(201).json({
            message: "Added to Workspace"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default router;


import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";
import { UnauthroizedError } from "../errors/unauthorizedError";
import { validate } from "../middleware/validator";
import { addMembertoWorkspace, workspaceSchema } from "../validators/workspaceValidator";
import { NotFoundError } from "../errors/notFound";

const router = Router();

//create workspaces
router.post("/", authenticate, validate(workspaceSchema), async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        throw new UnauthroizedError("User not Found");
    }

    const { title } = req.body;

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
        success: true,
        message: "Workspace created",
        data: {
            workspace
        }
    })
})

//add members to workspaces
router.post("/:workspaceId/members", validate(addMembertoWorkspace), authenticate, async (req, res) => {
    const userId = req.userId;

    const { workspaceId } = req.params;
    const { email } = req.body

    const workspaceMember = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId
            }
        }
    })

    if (!workspaceMember) {
        throw new UnauthroizedError("Only admins are authorized for this operation.")
    }

    if (workspaceMember?.role != 'ADMIN') {
        throw new UnauthroizedError("Only admins can add to workspaces")
    }

    const checkUserExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!checkUserExist?.id) {
        throw new NotFoundError("User not found")
    }

    const checkUserWorkspace = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: checkUserExist.id
            }
        }
    })

    if (checkUserWorkspace) {
        throw new UnauthroizedError("You are not a part of this workspace")
    }

    await prisma.workspaceMember.create({
        data: {
            userId: checkUserExist.id,
            workspaceId: workspaceId
        }
    })

    return res.status(201).json({
        success: true,
        message: "Added to Workspace"
    })
})

export default router;


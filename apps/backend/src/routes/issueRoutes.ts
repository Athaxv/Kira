import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";
import { ForbiddenError } from "../errors/forbiddenError";
import { NotFoundError } from "../errors/notFound";
import { validate } from "../middleware/validator";
import { issueSchema } from "../validators/issueValidator";
import type { Prisma } from "../../../../packages/db/src/generated/prisma/client";
import { emailQueue } from "../jobs/email/queue";
import { logger } from "../lib/logger";

const router = Router();

//GET issues
router.get("/:projectId/issues", authenticate, async (req, res) => {
    const userId = req.userId;

    const { projectId } = req.params;

    const { status, severity, search } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const where: Prisma.IssueWhereInput = {
        projectId
    }

    if (status){
        where.status = status
    }

    if (severity){
        where.severity = severity
    }

    if (search){
        where.OR = [
            {
                title: {
                    contains: search as String,
                    mode: "insensitive"
                }
            },
            {
                description: {
                    contains: search as String,
                    mode: "insensitive"
                }
            }
        ]
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!project) {
        throw new NotFoundError("Project not found")
    }

    const isPartofWorkspace = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: project.workspaceId,
                userId: userId
            }
        }
    })

    if (!isPartofWorkspace) {
        throw new ForbiddenError("You are not a member of this workspace")
    }
    
    const total = await prisma.issue.count({
        where
    })

    const totalPages = Math.ceil(total/limit)

    const issues = await prisma.issue.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    })

    return res.status(200).json({
        success: true,
        data: {
            issues,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        }
    })
})

//POST create issues
router.post("/:projectId/issues", validate(issueSchema), authenticate, async (req, res) => {
    const userId = req.userId;

    const { projectId } = req.params;
    const { title, description, severity } = req.body;

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!project) {
        throw new NotFoundError("Project not found");
    }

    const isPartofWorkspace = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: project.workspaceId,
                userId: userId
            }
        }
    })

    if (!isPartofWorkspace) {
        throw new ForbiddenError("You are not a member of this workspace")
    }

    const issue = await prisma.issue.create({
        data: {
            title,
            description,
            severity,
            projectId: project.id
        }
    })

    logger.info(issue, "Issue created");

    return res.status(201).json({
        success: true,
        message: "Issue created",
        data: {
            issue
        }
    })
})

//PATCH assignee user
router.patch("/:issueId/assign", authenticate, async (req, res) => {
    const userId = req.userId

    const { issueId } = req.params;
    const { email } = req.body;

    const getIssue = await prisma.issue.findUnique({
        where: {
            id: issueId
        },
    })

    if (!getIssue) {
        throw new NotFoundError("Issue not found")
    }

    const getProject = await prisma.project.findUnique({
        where: {
            id: getIssue.projectId
        }
    })

    if (!getProject) {
        throw new NotFoundError("Project not found")
    }

    const getUserStatus = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                userId,
                workspaceId: getProject.workspaceId
            }
        }
    })

    if (!getUserStatus) {
        throw new ForbiddenError("You are not a member of this workspace")
    }

    if (getUserStatus.role != "ADMIN") {
        throw new ForbiddenError("Only admins can assign issues")
    }

    const checkAssigne = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!checkAssigne) {
        throw new NotFoundError("Assignee not found")
    }

    const checkAssigneeExists = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: getProject.workspaceId,
                userId: checkAssigne.id
            }
        }
    })

    if (!checkAssigneeExists) {
        throw new ForbiddenError("Assignee is not a member of this workspace")
    }

    const updateissue = await prisma.issue.update({
        where: {
            id: issueId
        },
        data: {
            assigneeId: checkAssigneeExists.id
        }
    })

    await emailQueue.add(
        "Issue_assigned",
        {
            type: "Issue_assigned",
            assigneeId: checkAssigne.id,
            issueId: updateissue.id
        },
        {
            attempts: 5,
            backoff: {
                type: "exponential",
                delay: 1000
            },
            removeOnComplete: 100,
            removeOnFail: 100,
        }
    )


    return res.status(200).json({
        success: true,
        message: "Assignee updated",
        data: {
            updateissue
        }
    })
})


export default router;

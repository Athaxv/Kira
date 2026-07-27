import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";

const router = Router();

//GET issues
router.get("/:projectId/issues", authenticate, async (req, res) => {
    const userId = req.userId;

    try { 
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!project){
            return {
                success: false
            }
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
            return {
                success: false
            }
        }

        const issues = await prisma.issue.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json({
            message: "All issues",
            issues
        })
    } catch (error) {
        return {
            success: false
        }
    }
})

//POST create issues
router.post("/:projectId/issues", authenticate, async (req, res) => {
    const userId = req.userId;

    try {
        const { projectId } = req.params;
        const { title, description, severity } = req.body;

        if (!title.trim() || !description.trim() || !severity){
            return res.status(402).json({
                message: "No body provided for issues"
            })
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!project){
            return res.status(402).json({
                message: "No project exists"
            })
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
            return res.status(402).json({
                message: "Unauthorized"
            })
        }

        const issue = await prisma.issue.create({
            data: {
                title,
                description,
                severity,
                projectId: project.id
            }
        })

        return res.status(201).json({
            message: "Issue created",
            issue
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

//PATCH assignee user
router.patch("/issues/:issueId/assign", authenticate, async (req, res) => {
    const userId = req.userId

    try {
        const { issueId } = req.params;
        const { email } = req.body;

        const getIssue = await prisma.issue.findUnique({
            where: {
                id: issueId
            },
        })

        if (!getIssue){
            return res.status(404).json({
                message: "No issue exists"
            })
        }

        const getProject = await prisma.project.findUnique({
            where: {
                id: getIssue.projectId
            }
        })

        if (!getProject){
            return res.status(404).json({
                message: "No project exists"
            })
        }

        const getUserStatus = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    userId,
                    workspaceId: getProject.workspaceId
                }
            }
        })

        if (!getUserStatus){
            return res.status(404).json({
                message: "No workspace exists"
            })
        }

        if (getUserStatus.role != "ADMIN"){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        const checkAssigne = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!checkAssigne) {
            return res.status(403).json({
                message: "User not found"
            });
        }

        const checkAssigneeExists = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: getProject.workspaceId,
                    userId: checkAssigne.id
                }
            }
        })

        if (!checkAssigneeExists){
            return res.status(402).json({
                message: "No assigne exists in this workspace"
            })
        }

        const updateissue = await prisma.issue.update({
            where: {
                id: issueId
            },
            data: {
                assigneeId: checkAssigne.id
            }
        })


        return res.status(200).json({
            message: "Assignee updated",
            updateissue
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Error Occurred'
        })
    }
})


export default router;
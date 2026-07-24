import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";

const router = Router()

//GET all prjects
router.get("/workspaces/:workspaceId/projects", authenticate, async (req, res) => {
    const userId = req.userId;

    try {
        const { workspaceId } = req.params;

        const checkUserWorkspace = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId
                }
            }
        })

        if (!checkUserWorkspace){
            return res.status(403).json({
                message: "You not a member"
            })
        }

        const projects = await prisma.project.findMany({
            where: {
                workspaceId
            }
        })

        return res.status(200).json({
            message: "DONE",
            projects
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

//POST create project
router.post('/workspaces/:workspaceId/projects', authenticate, async (req, res) => {
    const userId = req.userId;

    try {
        const { workspaceId } = req.params;
        const { title } = req.body;

        if (!title.trim()){
            return res.status(400).json({
                message: "Project title is required"
            })
        }

        const checkAdmin = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId
                }
            }
        })

        if (!checkAdmin){
            return res.status(403).json({
                message: "You not a member"
            })
        }

        if (checkAdmin?.role != 'ADMIN'){
            return res.status(403).json({
                message: "Only Admins"
            })
        }

        const project = await prisma.project.create({
            data: {
                title: title,
                workspaceId: workspaceId
            }
        })

        return res.status(201).json({
            message: "Project created!",
            project
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

//DELETE project
router.delete('/workspaces/projects/:projectId', authenticate, async (req, res) => {
    const userId = req.userId;

    try {
        const { projectId } = req.params;

        const findProject = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!findProject){
            return res.json({
                message: "No project exist"
            })
        }

        const checkAdmin = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    findProject.workspaceId,
                    userId
                }
            }
        })

        if (!checkAdmin){
            return res.status(403).json({
                message: "You not a member"
            })
        }

        if (checkAdmin?.role != 'ADMIN'){
            return res.status(403).json({
                message: "Only Admins"
            })
        }

        await prisma.project.delete({
            where: {
                id: projectId
            }
        })

        return res.status(201).json({
            message: "Project Deleted!"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default router;
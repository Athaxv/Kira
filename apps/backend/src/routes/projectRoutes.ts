import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";
import { requireWorkspaceMember } from "../middleware/workspaceMember";
import { workspaceAdmin } from "../middleware/workspaceAdmin";

const router = Router()

//GET all project
router.get("/workspaces/:workspaceId/projects", authenticate, requireWorkspaceMember, async (req, res) => {
    try {
        const { workspaceId } = req.params;

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
router.post('/workspaces/:workspaceId/projects', authenticate, requireWorkspaceMember, workspaceAdmin, async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title } = req.body;

        if (!title.trim()){
            return res.status(400).json({
                message: "Project title is required"
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
router.delete('/workspaces/:workspaceId/projects/:projectId', authenticate, requireWorkspaceMember, workspaceAdmin, async (req, res) => {
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

        await prisma.project.delete({
            where: {
                id: projectId
            }
        })

        return res.status(200).json({
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
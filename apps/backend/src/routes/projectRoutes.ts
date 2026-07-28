import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { prisma } from "@repo/db";
import { requireWorkspaceMember } from "../middleware/workspaceMember";
import { workspaceAdmin } from "../middleware/workspaceAdmin";
import { validate } from "../middleware/validator";
import { createProjectSchema, patchProjectSchema } from "../validators/projectValidator";
import { NotFoundError } from "../errors/notFound";
import { client } from "../lib/redis";

const router = Router()

//GET project
router.get("/:workspaceId/project/:projectId", authenticate, requireWorkspaceMember, async (req, res) => {
    const { projectId } = req.params as {
        projectId: string
    };

    const key = `project:${projectId}`

    const cachedProject = await client.get(key);

    if (cachedProject){
        return res.status(200).json({
            success: true,
            data: {
                project: JSON.parse(cachedProject)
            }
        })
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!project){
        throw new NotFoundError("Project not found")
    }

    await client.set(key, JSON.stringify(project), { EX: 60 });

    return res.status(200).json({
        success: true,
        data: {
            project
        }
    })
})

//GET all project
router.get("/:workspaceId/projects", authenticate, requireWorkspaceMember, async (req, res) => {
    const { workspaceId } = req.params as { workspaceId: string };

    const key = `workspace:${workspaceId}:projects`;

    const cachedProject = await client.get(key);

    if (cachedProject){
        return res.status(200).json({
            success: true,
            data: {
                project: JSON.parse(cachedProject)
            }
        })
    }

    const projects = await prisma.project.findMany({
        where: {
            workspaceId
        }
    })

    await client.set(key, JSON.stringify(projects));

    return res.status(200).json({
        success: true,
        data: {
            projects
        }
    })
})

//POST create project
router.post('/:workspaceId/projects', validate(createProjectSchema), authenticate, requireWorkspaceMember, workspaceAdmin, async (req, res) => {
    const { workspaceId } = req.params;
    const { title } = req.body;

    const project = await prisma.project.create({
        data: {
            title: title,
            workspaceId: workspaceId
        }
    })

    return res.status(201).json({
        success: true,
        message: "Project created!",
        data: {
            project
        }
    })
})

//PATCH project
router.patch("/:workspaceId/project/:projectId", validate(patchProjectSchema), authenticate, requireWorkspaceMember, async (req, res) => {
    const { projectId } = req.params as { projectId: string }

    const { title } = req.body;

    const key = `project:${projectId}`

    const project = await prisma.project.update({
        where: {
            id: projectId
        },
        data: {
            title
        }
    })

    await client.del(key);

    return res.status(200).json({
        success: true,
        data: {
            project
        }
    })
})

//DELETE project
router.delete('/:workspaceId/projects/:projectId', authenticate, requireWorkspaceMember, workspaceAdmin, async (req, res) => {
    const { projectId } = req.params;

    const findProject = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!findProject) {
        throw new NotFoundError("Project not found")
    }

    await prisma.project.delete({
        where: {
            id: projectId
        }
    })

    return res.status(200).json({
        success: true,
        message: "Project Deleted!"
    })

})

export default router;
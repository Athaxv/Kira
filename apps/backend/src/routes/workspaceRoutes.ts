import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const title = req.body.title;

        if (!title) {
            return res.status(401).json({
                message: "No body for workspace creation"
            })
        }

        // const workspace 
    } catch (error) {

    }


})

export default router;
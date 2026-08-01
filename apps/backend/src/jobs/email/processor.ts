import type { Job } from "bullmq";
import type { sendEmailJob } from "./types";
import { NotFoundError } from "../../errors/notFound";
import { prisma } from "@repo/db";
import { resend } from "../../lib/resend";

export async function processEmailJob(job: Job<sendEmailJob>){
    if (job.name == "Welcome"){
        const { userId } = job.data as { userId: string };

        if (!userId) {
            throw new NotFoundError("No user exists")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if (!user) {
            throw new NotFoundError("No user exists")
        }

        await resend.emails.send({
            from: "noreply@athaxv.me",
            to: user.email,
            subject: "Welcome to Kira 🎉",
            text: `Hi, 
            Welcome to Kira!

Your account has been created successfully.

Happy building!`
        })
    }
    else if (job.name === "Issue_assigned"){
        const { assigneeId, issueId } = job.data as { assigneeId: string, issueId: string };

        const assignee = await prisma.user.findUnique({
            where: {
                id: assigneeId
            }
        })

        if (!assignee){
            throw new NotFoundError("Assignee not found")
        }

        const issue = await prisma.issue.findUnique({
            where: {
                id: issueId
            }
        })

        if (!issue){
            throw new NotFoundError("No issue found")
        }

        await resend.emails.send({
            from: "noreply@athaxv.me",
            to: assignee.email,
            subject: "Assigned New Issue",
            text: `Hey, new issue is assigned to you, go check it out ${issue.title}`
        })
    }
}
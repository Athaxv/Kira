import { Worker } from "bullmq";
import type { sendEmailJob } from "./types";
import { redis } from "@repo/redis";
import { processEmailJob }  from "./processor";
import { logger } from "../../lib/logger";

export const emailWorker = new Worker<sendEmailJob>(
    "email",
    processEmailJob,
    {
        connection: redis
    }
)

emailWorker.on("completed", (job) => {
    logger.info({
        jobId: job.id,
        jobName: job.name
    }, "Job completed")
})

emailWorker.on("failed", (job, err) => {
    logger.error({
        err,
        JobId: job?.id,
        jobName: job?.name
    }, "Job failed")
})
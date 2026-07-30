import { Worker } from "bullmq";
import type { sendEmailJob } from "./types";
import { redis } from "@repo/redis";
import { processEmailJob }  from "./processor";

export const emailWorker = new Worker<sendEmailJob>(
    "email",
    processEmailJob,
    {
        connection: redis
    }
)

emailWorker.on("completed", (job) => {
    console.log(`Job ${job.id} is completed`)
})

emailWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed`, err)
})
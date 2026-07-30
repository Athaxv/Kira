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
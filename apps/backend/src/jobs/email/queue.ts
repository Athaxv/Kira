import { redis } from "@repo/redis";
import { Queue } from "bullmq";
import type { sendEmailJob } from "./types";

export const emailQueue = new Queue<sendEmailJob>("email", {
    connection: redis
})


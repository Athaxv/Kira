import type { Job } from "bullmq";
import type { sendEmailJob } from "./types";

export async function processEmailJob(job: Job<sendEmailJob>){
    console.log("Processing email");

    console.log("Job: ", job);
}
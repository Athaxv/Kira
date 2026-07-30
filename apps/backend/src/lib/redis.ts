import { redis } from "@repo/redis";

export async function connectRedis(){
    if (redis.status == "wait"){
        await redis.connect();
        console.log("Redis connected!")
    }
}
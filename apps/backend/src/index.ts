import { env } from "./config/env";
import express from "express";
import authRoutes from "./routes/authRoutes"
import workspaceRoutes from "./routes/workspaceRoutes"
import projectRoutes from "./routes/projectRoutes"
import issueRoutes from "./routes/issueRoutes"
import { errorHandler } from "./middleware/errorHandler";
import { connectRedis } from "./lib/redis";
import { pinoHttp } from "pino-http";
import { logger } from "./lib/logger";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
    pinoHttp({
        logger
    })
)

await connectRedis();

app.use("/auth", authRoutes)
app.use("/workspaces", workspaceRoutes)
app.use("/workspaces", projectRoutes)
app.use("/issue", issueRoutes)

app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`App running on PORT ${env.PORT}`)
})

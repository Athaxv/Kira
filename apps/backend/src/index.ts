import express from "express";
import authRoutes from "./routes/authRoutes"
import workspaceRoutes from "./routes/workspaceRoutes"
import projectRoutes from "./routes/projectRoutes"
import { errorHandler } from "./middleware/errorHandler";
import { connectRedis } from "./lib/redis";

const app = express();
app.use(express.json());

await connectRedis();

app.use("/auth", authRoutes)
app.use("/workspaces", workspaceRoutes)
app.use("/workspaces", projectRoutes)

app.use(errorHandler);

app.listen(3000, () => {
    console.log(`App running on PORT 3000`)
})
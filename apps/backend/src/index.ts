import express from "express";
import authRoutes from "./routes/authRoutes"
import workspaceRoutes from "./routes/workspaceRoutes"
import projectRoutes from "./routes/projectRoutes"

const app = express();
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/workspaces", workspaceRoutes)
app.use("/workspaces", projectRoutes)

app.listen(3000, () => {
    console.log(`App running on PORT 3000`)
})
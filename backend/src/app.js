import express from "express";
import cors from "cors";
import folderRoutes from "./routes/folderRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/folders", folderRoutes);
app.use("/api/tasks", taskRoutes);

export default app;

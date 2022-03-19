import express from "express";
import cors from "cors";
import folderRoutes from "./routes/folderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/folders", folderRoutes);

export default app;

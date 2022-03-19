import express from "express";
import {
	getFolders,
	addFolder,
	updateFolder,
	deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

//get folders
router.get("/", getFolders);

//create folder
router.post("/", addFolder);

//update folder
router.put("/:folderid", updateFolder);

//delete folder
router.delete("/:folderid", deleteFolder);

export default router;

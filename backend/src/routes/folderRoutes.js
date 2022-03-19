import express from "express";
import {
	getFolders,
	getFolder,
	addFolder,
	updateFolder,
	deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

//get folders
router.get("/", getFolders);

//get folder
router.get("/:folderid", getFolder);

//create folder
router.post("/", addFolder);

//update folder
router.put("/:folderid", updateFolder);

//delete folder
router.delete("/:folderid", deleteFolder);

export default router;

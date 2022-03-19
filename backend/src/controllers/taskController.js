import { execute } from "../services/db.js";
import { sendJsonResponse } from "../services/http.js";

//get folders
async function getTasksDb(db, folderId) {
	const folderData = await db.get("SELECT * FROM Folder WHERE id = :folderId", {
		":folderId": folderId,
	});
	if (folderData) {
		const tasks = await db.all("SELECT * FROM Task WHERE id_folder = :folderId", {
			":folderId": folderId,
		});
		return { folder: folderData, tasks };
	} else throw new Error("Folder not found");
}

export const getTasks = async (req, res) => {
	if (req.params && req.params.folderid) {
		const parsedId = Number(req.params.folderid);
		if (!Number.isNaN(parsedId)) {
			const result = await execute(getTasksDb, [parsedId]);
			if (result.success) {
				sendJsonResponse(res, 200, result);
			} else {
				if (result.error.message === "Folder not found") {
					sendJsonResponse(res, 404, result);
				} else {
					sendJsonResponse(res, 500, result);
				}
			}
		} else {
			sendJsonResponse(res, 400, {
				success: false,
				error: { message: "Folder id should be integer" },
			});
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: 'Missing "folderid" in request parameters' },
		});
	}
};

//create task
async function addTaskDb(db, name, folderId) {
	const folderData = await db.get("SELECT * FROM Folder WHERE id = :folderId", {
		":folderId": folderId,
	});
	if (folderData) {
		const result = await db.run(
			"INSERT INTO Task (done, name, id_folder) VALUES (FALSE, :name, :folderId)",
			{ ":name": name, ":folderId": folderId }
		);
		return { id: result.lastID, done: false, name, id_folder: folderId };
	} else throw new Error("Folder not found");
}

export const addTask = async (req, res) => {
	if (req.params && req.params.folderid) {
		if (req.body.name) {
			const parsedId = Number(req.params.folderid);
			if (!Number.isNaN(parsedId)) {
				const result = await execute(addTaskDb, [req.body.name, parsedId]);
				if (result.success) {
					sendJsonResponse(res, 201, result);
				} else {
					if (result.error.message === "Folder not found") {
						sendJsonResponse(res, 404, result);
					} else {
						sendJsonResponse(res, 500, result);
					}
				}
			} else {
				sendJsonResponse(res, 400, {
					success: false,
					error: { message: "Folder id should be integer" },
				});
			}
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: 'Missing "name" in request body' },
		});
	}
};

//update task

async function updateTaskDb(db, folderId, taskId, newName) {
	const folderData = await db.get("SELECT * FROM Folder WHERE id = :folderId", {
		":folderId": folderId,
	});
	if (folderData) {
		const result = await db.run(
			"UPDATE Task SET name = :newName WHERE id = :id AND id_folder = :folderId",
			{
				":newName": newName,
				":id": taskId,
				":folderId": folderId,
			}
		);
		if (result.changes === 1) {
			return await db.get("SELECT * FROM Task WHERE id = :id", { ":id": taskId });
		} else throw new Error("Not found");
	} else throw new Error("Folder not found");
}

async function toggleTaskDb(db, folderId, taskId) {
	const folderData = await db.get("SELECT * FROM Folder WHERE id = :folderId", {
		":folderId": folderId,
	});
	if (folderData) {
		const result = await db.run(
			"UPDATE Task SET done = NOT done WHERE id = :id AND id_folder = :folderId",
			{
				":id": taskId,
				":folderId": folderId,
			}
		);
		if (result.changes === 1) {
			return await db.get("SELECT * FROM Task WHERE id = :id", { ":id": taskId });
		} else throw new Error("Not found");
	} else throw new Error("Folder not found");
}

export const updateTask = async (req, res) => {
	if (req.params && req.params.folderid && req.params.taskid) {
		const parsedFolderId = Number(req.params.folderid);
		const parsedTaskId = Number(req.params.taskid);
		if (!Number.isNaN(parsedFolderId) && !Number.isNaN(parsedTaskId)) {
			let result;
			if (req.body.newName) {
				result = await execute(updateTaskDb, [
					parsedFolderId,
					parsedTaskId,
					req.body.newName,
				]);
			} else if (req.body.toggle) {
				result = await execute(toggleTaskDb, [parsedFolderId, parsedTaskId]);
			} else {
				sendJsonResponse(res, 400, {
					success: false,
					error: { message: 'Missing "newName" or "toggle" in request body' },
				});
				return;
			}
			if (result.success) {
				sendJsonResponse(res, 200, result);
			} else {
				if (
					result.error.message === "Not found" ||
					result.error.message === "Folder not found"
				) {
					sendJsonResponse(res, 404, result);
				} else {
					sendJsonResponse(res, 500, result);
				}
			}
		} else {
			sendJsonResponse(res, 400, {
				success: false,
				error: { message: "IDs should be integer" },
			});
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: "Missing IDs in request parameters" },
		});
	}
};

//delete task
async function deleteTaskDb(db, folderId, taskId) {
	const folderData = await db.get("SELECT * FROM Folder WHERE id = :folderId", {
		":folderId": folderId,
	});
	if (folderData) {
		const result = await db.run("DELETE FROM Task WHERE id = :id AND id_folder = :folderId", {
			":id": taskId,
			":folderId": folderId,
		});
		if (result.changes === 1) {
			return;
		} else throw new Error("Not found");
	} else throw new Error("Folder not found");
}

export const deleteTask = async (req, res) => {
	if (req.params && req.params.folderid && req.params.taskid) {
		const parsedFolderId = Number(req.params.folderid);
		const parsedTaskId = Number(req.params.taskid);
		if (!Number.isNaN(parsedFolderId) && !Number.isNaN(parsedTaskId)) {
			const result = await execute(deleteTaskDb, [parsedFolderId, parsedTaskId]);
			if (result.success) {
				sendJsonResponse(res, 200, result);
			} else {
				if (
					result.error.message === "Not found" ||
					result.error.message === "Folder not found"
				) {
					sendJsonResponse(res, 404, result);
				} else {
					sendJsonResponse(res, 500, result);
				}
			}
		} else {
			sendJsonResponse(res, 400, {
				success: false,
				error: { message: "IDs should be integer" },
			});
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: "Missing IDs in request parameters" },
		});
	}
};

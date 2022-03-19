import { execute } from "../services/db.js";
import { sendJsonResponse } from "../services/http.js";

//get folders
async function getFoldersDb(db) {
	return await db.all("SELECT * FROM Folder");
}
export const getFolders = async (req, res) => {
	const result = await execute(getFoldersDb);
	if (result.success) {
		sendJsonResponse(res, 200, result);
	} else {
		sendJsonResponse(res, 500, result);
	}
};

//create folder
async function addFolderDb(db, name) {
	const result = await db.run("INSERT INTO Folder (name) VALUES (:name)", { ":name": name });
	return { id: result.lastID, name };
}
export const addFolder = async (req, res) => {
	if (req.body.name) {
		const result = await execute(addFolderDb, [req.body.name]);
		if (result.success) {
			sendJsonResponse(res, 201, result);
		} else {
			sendJsonResponse(res, 500, result);
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: 'Missing "name" in request body' },
		});
	}
};

//update folder
async function updateFolderDb(db, id, newName) {
	const result = await db.run("UPDATE Folder SET name = :newName WHERE id = :id", {
		":newName": newName,
		":id": id,
	});
	if (result.changes === 1) {
		return { id, name: newName };
	} else throw new Error("Not found");
}
export const updateFolder = async (req, res) => {
	if (req.params && req.params.folderid) {
		if (req.body.newName) {
			const parsedId = Number(req.params.folderid);
			if (!Number.isNaN(parsedId)) {
				const result = await execute(updateFolderDb, [parsedId, req.body.newName]);
				if (result.success) {
					sendJsonResponse(res, 200, result);
				} else {
					if (result.error.message === "Not found") {
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
				error: { message: 'Missing "newName" in request body' },
			});
		}
	} else {
		sendJsonResponse(res, 400, {
			success: false,
			error: { message: 'Missing "folderid" in request parameters' },
		});
	}
};

//delete folder
async function deleteFolderDb(db, id) {
	const result = await db.run("DELETE FROM Folder WHERE id = :id", { ":id": id });
	if (result.changes === 1) {
		return;
	} else throw new Error("Not found");
}
export const deleteFolder = async (req, res) => {
	if (req.params && req.params.folderid) {
		const parsedId = Number(req.params.folderid);
		if (!Number.isNaN(parsedId)) {
			const result = await execute(deleteFolderDb, { id: req.params.folderid });
			if (result.success) {
				sendJsonResponse(res, 200, result);
			} else {
				if (result.error.message === "Not found") {
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

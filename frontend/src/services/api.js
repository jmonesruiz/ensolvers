import axios from "axios";
import { apiConfig } from "../config";

const baseUrl = `http://${apiConfig.adress}:${apiConfig.port}`;

const fetchFolders = async () => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/folders`,
			method: "GET",
		});
		if (result.data.success) {
			return result.data.data;
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};

const removeFolder = async (id) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/folders/${id}`,
			method: "DELETE",
		});
		if (result.data.success) {
			return true;
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};

const editFolder = async (id, newName) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/folders/${id}`,
			method: "PUT",
			data: { newName },
		});
		if (result.data.success) {
			return result.data.data;
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};

const addFolder = async (name) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/folders`,
			method: "POST",
			data: { name },
		});
		if (result.data.success) {
			return result.data.data;
		} else {
			return;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};

const fetchTasks = async (folderId) => {
	const id = parseInt(folderId);
	if (tasks.has(id)) {
		return {
			currentFolder: folders.find((a) => a.id === id),
			tasks: tasks.get(id),
		};
	} else {
		return { currentFolder: folders.find((a) => a.id === id), tasks: [] };
	}
};

const removeTask = async (id) => {
	return true;
};

const editTask = async (id, newName) => {
	return true;
};

const toggleTask = async (id, newName) => {
	return true;
};

const addTask = async (name) => {
	return { id: name, name };
};

export default {
	fetchFolders,
	removeFolder,
	editFolder,
	addFolder,
	fetchTasks,
	removeTask,
	editTask,
	toggleTask,
	addTask,
};

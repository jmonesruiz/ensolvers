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
	try {
		const result = await axios({
			url: `${baseUrl}/api/tasks/${folderId}`,
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

const removeTask = async (folderId, id) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/tasks/${folderId}/${id}`,
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

const editTask = async (folderId, id, newName) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/tasks/${folderId}/${id}`,
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

const toggleTask = async (folderId, id, newName) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/tasks/${folderId}/${id}`,
			method: "PUT",
			data: { toggle: true },
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

const addTask = async (folderId, name) => {
	try {
		const result = await axios({
			url: `${baseUrl}/api/tasks/${folderId}`,
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

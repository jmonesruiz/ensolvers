const folders = [
	{ id: 0, name: "Work" },
	{ id: 1, name: "Daily tasks" },
	{ id: 2, name: "Schoolwork" },
	{ id: 3, name: "Other" },
];

const tasks = new Map([
	[
		0,
		[
			{ id: 0, done: false, name: "Finish technical task" },
			{ id: 1, done: false, name: "Write report" },
			{ id: 2, done: true, name: "Send resume" },
		],
	],
]);

const fetchFolders = async () => {
	return folders;
};

const removeFolder = async (id) => {
	return true;
};

const editFolder = async (id, newName) => {
	return true;
};

const addFolder = async (name) => {
	return { id: name, name };
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

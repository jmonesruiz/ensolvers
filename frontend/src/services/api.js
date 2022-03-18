const folders = [
	{ id: 0, name: "Work" },
	{ id: 1, name: "Daily tasks" },
	{ id: 2, name: "Schoolwork" },
	{ id: 3, name: "Other" },
];

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

export default { fetchFolders, removeFolder, editFolder, addFolder };

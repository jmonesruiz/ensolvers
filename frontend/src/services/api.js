const folders = [
	{ id: 0, name: "Work" },
	{ id: 1, name: "Daily tasks" },
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

export default { fetchFolders, removeFolder, editFolder };

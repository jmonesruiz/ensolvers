import { createSlice } from "@reduxjs/toolkit";
import services from "../../services/api";

const initialState = [];

const foldersSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {
		foldersUpdated: (_, action) => {
			return action.payload.folders;
		},
		folderRemoved: (prev, action) => {
			const index = prev.findIndex((a) => {
				return a.id === action.payload.id;
			});
			prev.splice(index, 1);
			return prev;
		},
		folderEdited: (prev, action) => {
			console.log(action.payload);
			prev = prev.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, name: action.payload.name };
				} else {
					return item;
				}
			});
			return prev;
		},
		folderAdded: (prev, action) => {
			prev.push(action.payload.newFolder);
			return prev;
		},
	},
});

export const fetchFolders = () => {
	return async (dispatch) => {
		const folders = await services.fetchFolders();
		console.log(folders);
		if (folders) {
			dispatch(foldersSlice.actions.foldersUpdated({ folders }));
		}
	};
};

export const deleteFolder = (id) => {
	return async (dispatch) => {
		if (await services.removeFolder(id)) {
			dispatch(foldersSlice.actions.folderRemoved({ id }));
		}
	};
};

export const editFolder = (id, newName) => {
	return async (dispatch) => {
		const editedFolder = await services.editFolder(id, newName);
		if (editedFolder) {
			dispatch(foldersSlice.actions.folderEdited(editedFolder));
		}
	};
};

export const addFolder = (name) => {
	return async (dispatch) => {
		const newFolder = await services.addFolder(name);
		if (newFolder) {
			dispatch(foldersSlice.actions.folderAdded({ newFolder }));
		}
	};
};

export default foldersSlice.reducer;

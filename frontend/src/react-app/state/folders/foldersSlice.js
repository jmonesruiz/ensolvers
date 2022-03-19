import { createSlice } from "@reduxjs/toolkit";
import services from "../../services/api";
import { addNotification } from "../notification/notificationSlice";

const initialState = { firstFetch: true, folders: [] };

const foldersSlice = createSlice({
	name: "folders",
	initialState,
	reducers: {
		foldersUpdated: (_, action) => {
			return { firstFetch: false, folders: action.payload.folders };
		},
		folderRemoved: (prev, action) => {
			const index = prev.folders.findIndex((a) => {
				return a.id === action.payload.id;
			});
			prev.folders.splice(index, 1);
			return prev;
		},
		folderEdited: (prev, action) => {
			prev.folders = prev.folders.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, name: action.payload.name };
				} else {
					return item;
				}
			});
			return prev;
		},
		folderAdded: (prev, action) => {
			prev.folders.push(action.payload.newFolder);
			return prev;
		},
	},
});

export const fetchFolders = () => {
	return async (dispatch, getState) => {
		const folders = await services.fetchFolders();
		if (folders) {
			if (getState().folders.firstFetch) {
				dispatch(addNotification({ type: "SUCCESS", message: "Folders loaded" }));
			}
			dispatch(foldersSlice.actions.foldersUpdated({ folders }));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't load folders" }));
		}
	};
};

export const deleteFolder = (id) => {
	return async (dispatch) => {
		if (await services.removeFolder(id)) {
			dispatch(addNotification({ type: "SUCCESS", message: "Folder deleted" }));
			dispatch(foldersSlice.actions.folderRemoved({ id }));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't delete folder" }));
		}
	};
};

export const editFolder = (id, newName) => {
	return async (dispatch) => {
		const editedFolder = await services.editFolder(id, newName);
		if (editedFolder) {
			dispatch(addNotification({ type: "SUCCESS", message: "Folder edited" }));
			dispatch(foldersSlice.actions.folderEdited(editedFolder));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't edit folder" }));
		}
	};
};

export const addFolder = (name) => {
	return async (dispatch) => {
		const newFolder = await services.addFolder(name);
		if (newFolder) {
			dispatch(addNotification({ type: "SUCCESS", message: "Folder added" }));
			dispatch(foldersSlice.actions.folderAdded({ newFolder }));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't add folder" }));
		}
	};
};

export default foldersSlice.reducer;

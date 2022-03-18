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
			prev = prev.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, name: action.payload.newName };
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
		if (await services.editFolder(id, newName)) {
			dispatch(foldersSlice.actions.folderEdited({ id, newName }));
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

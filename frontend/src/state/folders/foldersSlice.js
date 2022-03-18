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
			const index = prev.findIndex((a) => a.id == action.payload.id);
			prev.splice(index, 1);
			return prev;
		},
		folderEdited: (prev, action) => {
			prev = prev.map((item) => {
				if (item.id == action.payload.id) {
					item.name == action.payload.newName;
				}
				return item;
			});
			return prev;
		},
	},
});

export const fetchFolders = () => {
	return async (dispatch) => {
		const folders = await services.fetchFolders();
		dispatch(foldersSlice.actions.foldersUpdated({ folders }));
	};
};

export const deleteFolder = (id) => {
	return async (dispatch) => {
		if (await services.removeFolder(id)) {
			dispatch(foldersSlice.actions.folderRemoved(id));
		}
	};
};

export const editFolder = (id, newName) => {
	return async (dispatch) => {
		if (await services.editFolder(id, newName)) {
			dispatch(foldersSlice.actions.folderEdited(id, newName));
		}
	};
};

// export const {  } = foldersSlice.actions;

export default foldersSlice.reducer;

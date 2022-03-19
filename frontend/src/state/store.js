import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./folders/foldersSlice";
import popupReducer from "./popup/popupSlice";
import taskReducer from "./tasks/tasksSlice";

export const store = configureStore({
	reducer: {
		folders: foldersReducer,
		tasks: taskReducer,
		popup: popupReducer,
	},
});

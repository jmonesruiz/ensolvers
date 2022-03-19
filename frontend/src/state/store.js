import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./folders/foldersSlice";
import popupReducer from "./popup/popupSlice";
import taskReducer from "./tasks/tasksSlice";
import notificationReducer from "./notification/notificationSlice";

export const store = configureStore({
	reducer: {
		folders: foldersReducer,
		tasks: taskReducer,
		popup: popupReducer,
		notification: notificationReducer,
	},
});

import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./folders/foldersSlice";
import popupReducer from "./popup/popupSlice";

export const store = configureStore({
	reducer: {
		folders: foldersReducer,
		popup: popupReducer,
	},
});

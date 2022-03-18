import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./folders/foldersSlice";

export const store = configureStore({
	reducer: {
		folders: foldersReducer,
	},
});

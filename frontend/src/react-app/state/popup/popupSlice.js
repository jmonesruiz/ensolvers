import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: "CLOSED" };

const popupSlice = createSlice({
	name: "popup",
	initialState,
	reducers: {
		openPopUp: (_, action) => {
			return { status: action.payload.status, data: action.payload.data };
		},
		closePopUp: () => {
			return { status: "CLOSED" };
		},
	},
});

export const { openPopUp, closePopUp } = popupSlice.actions;

export default popupSlice.reducer;

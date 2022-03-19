import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	curr: null,
	queue: [],
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		addNotification: (prev, action) => {
			if (!prev.curr) {
				prev.curr = action.payload;
			} else {
				prev.queue.push(action.payload);
			}
		},
		delCurrNotification: (prev) => {
			if (prev.queue.length === 0) {
				prev.curr = null;
			} else {
				prev.curr = prev.queue.shift();
			}
		},
	},
});

export const { addNotification, delCurrNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

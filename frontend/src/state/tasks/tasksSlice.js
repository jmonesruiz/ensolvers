import { createSlice } from "@reduxjs/toolkit";
import services from "../../services/api";

const initialState = { currentFolder: { name: "" }, tasks: [] };

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		tasksFetched: (_, action) => {
			return { currentFolder: action.payload.currentFolder, tasks: action.payload.tasks };
		},
		taskRemoved: (prev, action) => {
			const index = prev.tasks.findIndex((a) => {
				return a.id === action.payload.id;
			});
			prev.tasks.splice(index, 1);
			return prev;
		},
		taskEdited: (prev, action) => {
			prev.tasks = prev.tasks.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, name: action.payload.newName };
				} else {
					return item;
				}
			});
			return prev;
		},
		taskToggle: (prev, action) => {
			prev.tasks = prev.tasks.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, done: !item.done };
				} else {
					return item;
				}
			});
			return prev;
		},
		taskAdded: (prev, action) => {
			prev.tasks.push(action.payload.newTask);
			return prev;
		},
	},
});

export const fetchTasks = (folderId) => {
	return async (dispatch) => {
		const data = await services.fetchTasks(folderId);
		if (data) {
			dispatch(
				tasksSlice.actions.tasksFetched({
					currentFolder: data.currentFolder,
					tasks: data.tasks,
				})
			);
		}
	};
};

export const deleteTask = (id) => {
	return async (dispatch) => {
		if (await services.removeTask(id)) {
			dispatch(tasksSlice.actions.taskRemoved({ id }));
		}
	};
};

export const editTask = (id, newName) => {
	return async (dispatch) => {
		if (await services.editTask(id, newName)) {
			dispatch(tasksSlice.actions.taskEdited({ id, newName }));
		}
	};
};

export const toggleTask = (id) => {
	return async (dispatch) => {
		if (await services.toggleTask(id)) {
			dispatch(tasksSlice.actions.taskToggle({ id }));
		}
	};
};

export const addTask = (name) => {
	return async (dispatch) => {
		const newTask = await services.addTask(name);
		if (newTask) {
			dispatch(tasksSlice.actions.taskAdded({ newTask }));
		}
	};
};

export default tasksSlice.reducer;

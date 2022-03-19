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
					return action.payload;
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
		reset: () => {
			return { currentFolder: { name: "" }, tasks: [] };
		},
	},
});

export const fetchTasks = (folderId) => {
	return async (dispatch) => {
		const data = await services.fetchTasks(folderId);
		if (data) {
			dispatch(
				tasksSlice.actions.tasksFetched({
					currentFolder: data.folder,
					tasks: data.tasks,
				})
			);
		}
	};
};

export const deleteTask = (folderId, id) => {
	return async (dispatch) => {
		if (await services.removeTask(folderId, id)) {
			dispatch(tasksSlice.actions.taskRemoved({ id }));
		}
	};
};

export const editTask = (folderId, id, newName) => {
	return async (dispatch) => {
		const editedTask = await services.editTask(folderId, id, newName);
		if (editedTask) {
			dispatch(tasksSlice.actions.taskEdited(editedTask));
		}
	};
};

export const toggleTask = (folderId, id) => {
	return async (dispatch) => {
		const editedTask = await services.toggleTask(folderId, id);
		if (editedTask) {
			dispatch(tasksSlice.actions.taskEdited(editedTask));
		}
	};
};

export const addTask = (folderId, name) => {
	return async (dispatch) => {
		const newTask = await services.addTask(folderId, name);
		if (newTask) {
			dispatch(tasksSlice.actions.taskAdded({ newTask }));
		}
	};
};

export const { reset } = tasksSlice.actions;

export default tasksSlice.reducer;

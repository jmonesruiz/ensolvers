import { createSlice } from "@reduxjs/toolkit";
import services from "../../services/api";
import { addNotification } from "../notification/notificationSlice";

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
			dispatch(addNotification({ type: "SUCCESS", message: "Tasks loaded" }));
			dispatch(
				tasksSlice.actions.tasksFetched({
					currentFolder: data.folder,
					tasks: data.tasks,
				})
			);
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't load tasks" }));
		}
	};
};

export const deleteTask = (folderId, id) => {
	return async (dispatch) => {
		if (await services.removeTask(folderId, id)) {
			dispatch(addNotification({ type: "SUCCESS", message: "Task deleted" }));
			dispatch(tasksSlice.actions.taskRemoved({ id }));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't delete task" }));
		}
	};
};

export const editTask = (folderId, id, newName) => {
	return async (dispatch) => {
		const editedTask = await services.editTask(folderId, id, newName);
		if (editedTask) {
			dispatch(addNotification({ type: "SUCCESS", message: "Task edited" }));
			dispatch(tasksSlice.actions.taskEdited(editedTask));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't edit task" }));
		}
	};
};

export const toggleTask = (folderId, id) => {
	return async (dispatch) => {
		const editedTask = await services.toggleTask(folderId, id);
		if (editedTask) {
			dispatch(addNotification({ type: "SUCCESS", message: "Task toggled" }));
			dispatch(tasksSlice.actions.taskEdited(editedTask));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't toggle task" }));
		}
	};
};

export const addTask = (folderId, name) => {
	return async (dispatch) => {
		const newTask = await services.addTask(folderId, name);
		if (newTask) {
			dispatch(addNotification({ type: "SUCCESS", message: "Task added" }));
			dispatch(tasksSlice.actions.taskAdded({ newTask }));
		} else {
			dispatch(addNotification({ type: "ERROR", message: "Couldn't add task" }));
		}
	};
};

export const { reset } = tasksSlice.actions;

export default tasksSlice.reducer;

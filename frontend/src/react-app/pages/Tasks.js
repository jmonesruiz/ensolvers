import React, { useEffect } from "react";
import "./Tasks.scss";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import ItemInput from "../components/itemInput/ItemInput";
import { useDispatch, useSelector } from "react-redux";
import {
	addTask,
	deleteTask,
	editTask,
	fetchTasks,
	toggleTask,
	reset,
} from "../state/tasks/tasksSlice";
import TaskTableElement from "../components/table/TaskTableElement";
import PopUpDelete from "../components/popup/PopUpDelete";
import PopUpEdit from "../components/popup/PopUpEdit";
import { openPopUp } from "../state/popup/popupSlice";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Tasks() {
	const { folderId } = useParams();
	const tasks = useSelector((state) => state.tasks.tasks);
	const currentFolder = useSelector((state) => state.tasks.currentFolder);
	const popUpStatus = useSelector((state) => state.popup.status);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		async function checkFolder() {
			const exists = await api.checkFolderExists(folderId);
			if (exists) {
				dispatch(fetchTasks(folderId));
			} else {
				navigate("../folders");
			}
		}
		checkFolder();
		return () => {
			dispatch(reset());
		};
	}, []);

	return (
		<>
			<div className="tasks">
				<Header title="Folders" subtitle={currentFolder.name} backTo="../folders" />
				<Table
					items={tasks.map((item) => (
						<TaskTableElement
							item={item}
							onToggle={() => {
								dispatch(toggleTask(currentFolder.id, item.id));
							}}
						/>
					))}
					rows={6}
					onEdit={(index) => {
						const item = tasks[index];
						dispatch(openPopUp({ status: "EDIT", data: item }));
					}}
					onDelete={(index) => {
						const item = tasks[index];
						dispatch(openPopUp({ status: "DELETE", data: item }));
					}}
				/>
				<ItemInput
					placeholder="New Task"
					onAdd={(value) => {
						dispatch(addTask(currentFolder.id, value));
					}}
				/>
			</div>
			{popUpStatus === "DELETE" && (
				<PopUpDelete
					type="task"
					onDelete={(id) => dispatch(deleteTask(currentFolder.id, id))}
				/>
			)}
			{popUpStatus === "EDIT" && (
				<PopUpEdit
					type="task"
					onEdit={(id, newValue) => dispatch(editTask(currentFolder.id, id, newValue))}
				/>
			)}
		</>
	);
}

export default Tasks;

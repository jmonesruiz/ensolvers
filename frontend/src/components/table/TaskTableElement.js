import React from "react";
import "./TaskTableElement.scss";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../state/tasks/tasksSlice";

function TaskTableElement(props) {
	const dispatch = useDispatch();
	return (
		<label htmlFor={`task-table-element-${props.item.id}`} className="task-table-element">
			<input
				name={`task-table-element-${props.item.id}`}
				id={`task-table-element-${props.item.id}`}
				type="checkbox"
				className={"task-table-element__checkbox-input"}
				checked={props.item.done}
				onChange={(e) => {
					dispatch(toggleTask(props.item.id));
				}}
			/>
			<div className="task-table-element__checkbox">
				<TiTick className="task-table-element__checkbox-icon" />
			</div>
			{props.item.name}
		</label>
	);
}

export default TaskTableElement;

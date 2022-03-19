import React from "react";
import "./TaskTableElement.scss";
import { TiTick } from "react-icons/ti";

function TaskTableElement(props) {
	return (
		<label htmlFor={`task-table-element-${props.item.id}`} className="task-table-element">
			<input
				name={`task-table-element-${props.item.id}`}
				id={`task-table-element-${props.item.id}`}
				type="checkbox"
				className={"task-table-element__checkbox-input"}
				checked={props.item.done}
				onChange={(e) => {
					props.onToggle();
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

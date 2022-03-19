import React from "react";
import "./Table.scss";
import { FaTrash as DeleteIcon } from "react-icons/fa";
import { AiFillEdit as EditIcon } from "react-icons/ai";

function Table(props) {
	let rows = props.items.map((item, index) => (
		<div className="table__row" key={index}>
			<div className="table__cell">{item}</div>
			<div className="table__cell">
				<button
					className="table__btn--edit"
					onClick={() => {
						props.onEdit(index);
					}}
				>
					<EditIcon className="table__icon-edit" />
				</button>
			</div>
			<div className="table__cell">
				<button
					className="table__btn--delete"
					onClick={() => {
						props.onDelete(index);
					}}
				>
					<DeleteIcon className="table__icon-delete" />
				</button>
			</div>
		</div>
	));

	if (props.rows) {
		const missingRows = props.rows - rows.length;
		for (let i = 0; i < missingRows; i++) {
			rows.push(
				<div className="table__row" key={rows.length}>
					<div className="table__cell"></div>
					<div className="table__cell"></div>
					<div className="table__cell"></div>
				</div>
			);
		}
	}

	return <div className="table">{rows}</div>;
}

export default Table;

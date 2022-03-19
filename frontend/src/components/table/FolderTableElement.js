import React from "react";
import "./FolderTableElement.scss";
import { RiFolderFill as FolderIcon, RiFolderOpenFill as FolderOpenIcon } from "react-icons/ri";
import { Link } from "react-router-dom";

function FolderTableElement(props) {
	return (
		<Link to={`../tasks/${props.item.id}`} className="folder-table-element">
			<div className="folder-table-element__icon-container">
				<FolderIcon className="folder-table-element__icon--closed" />
				<FolderOpenIcon className="folder-table-element__icon--open" />
			</div>
			{props.item.name}
		</Link>
	);
}

export default FolderTableElement;

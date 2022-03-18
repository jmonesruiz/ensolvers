import React from "react";
import { useParams } from "react-router-dom";
import "./Todos.scss";

function Todos() {
	const { folderId } = useParams();
	return (
		<div className="todos">
			<h2>{folderId}</h2>
		</div>
	);
}

export default Todos;

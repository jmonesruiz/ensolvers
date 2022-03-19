import React from "react";
import { createPortal } from "react-dom";
import "./PopUp.scss";

function PopUp(props) {
	return createPortal(
		<>
			<div className="pop-up">
				<header className="pop-up__header">
					<h2 className="pop-up__title">{props.title}</h2>
				</header>
				<form onSubmit={props.onSubmit} className="pop-up__main">
					{props.body}
				</form>
			</div>
			<div className="overlay"></div>
		</>,
		document.getElementById("root_pop-up")
	);
}

export default PopUp;

import React from "react";
import "./PopUpDelete.scss";
import PopUp from "./PopUp";
import { useSelector, useDispatch } from "react-redux";
import { closePopUp } from "../../state/popup/popupSlice";

function PopUpDelete(props) {
	const item = useSelector((state) => state.popup.data);
	const dispatch = useDispatch();

	return (
		<PopUp
			title={`Delete ${props.type}`}
			body={
				<>
					<p className="pop-up-delete__message">
						{`Are you sure you want to delete this ${props.type}?`}
					</p>
					<div className="pop-up-delete__name">{item.name}</div>
					<div className="pop-up-delete__actions">
						<button
							className="pop-up-delete__btn-cancel"
							onClick={() => dispatch(closePopUp())}
						>
							Cancel
						</button>
						<button
							className="pop-up-delete__btn-delete"
							onClick={() => {
								props.onDelete(item.id);
								dispatch(closePopUp());
							}}
						>
							Delete
						</button>
					</div>
				</>
			}
		/>
	);
}

export default PopUpDelete;

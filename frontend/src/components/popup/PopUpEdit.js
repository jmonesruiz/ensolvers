import React, { useState, useRef, useEffect } from "react";
import "./PopUpEdit.scss";
import PopUp from "./PopUp";
import { useSelector, useDispatch } from "react-redux";
import { closePopUp } from "../../state/popup/popupSlice";

function PopUpEdit(props) {
	const item = useSelector((state) => state.popup.data);
	const dispatch = useDispatch();
	const [value, setValue] = useState(item.name);

	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const valid = value.trim() !== "";

	return (
		<PopUp
			title={`Edit ${props.type}`}
			body={
				<>
					<p className="pop-up-edit__message">{`Editing ${props.type} "${item.name}"`}</p>
					<div className="pop-up-edit__input-container">
						<input
							ref={inputRef}
							type="text"
							name=""
							id=""
							className="pop-up-edit__input"
							placeholder="Value"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
					<div className="pop-up-edit__actions">
						<button
							className="pop-up-edit__btn-cancel"
							onClick={() => dispatch(closePopUp())}
						>
							Cancel
						</button>
						<button
							className="pop-up-edit__btn-save"
							onClick={() => {
								props.onEdit(item.id, value);
								dispatch(closePopUp());
							}}
							disabled={!valid}
						>
							Save
						</button>
					</div>
				</>
			}
		/>
	);
}

export default PopUpEdit;

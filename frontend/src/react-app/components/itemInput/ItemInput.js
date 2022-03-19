import React, { useState } from "react";
import "./ItemInput.scss";

const ItemInput = React.forwardRef((props, ref) => {
	const [value, setValue] = useState("");

	const valid = value.trim() !== "";

	return (
		<form
			className="item-input"
			onSubmit={(e) => {
				e.preventDefault();
				if (valid) {
					props.onAdd(value);
					setValue("");
				}
			}}
		>
			<input
				ref={ref}
				type="text"
				name=""
				id=""
				className="item-input__input"
				placeholder={props.placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button className="item-input__add-btn" disabled={!valid}>
				Add
				{props.icon ? (
					props.icon
				) : (
					<div className="item-input__add-icon">
						<span>+</span>
					</div>
				)}
			</button>
		</form>
	);
});

export default ItemInput;

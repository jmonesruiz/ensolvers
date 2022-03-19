import React, { useEffect, useState } from "react";
import "./Notification.scss";
import { BsCheck } from "react-icons/bs";
import { TiInfoLarge } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { delCurrNotification } from "../../state/notification/notificationSlice";

function Notification() {
	const notification = useSelector((state) => state.notification.curr);
	const dispatch = useDispatch();

	const [disappear, setDissappear] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setDissappear(true);
			setTimeout(() => {
				setDissappear(false);
				dispatch(delCurrNotification());
			}, 400);
		}, 1200);
	}, [notification]);

	let icon = <TiInfoLarge className="notification__icon--info" />;
	if (notification.type === "SUCCESS") {
		icon = <BsCheck className="notification__icon--success" />;
	} else if (notification.type == "ERROR") {
		icon = <FaTimes className="notification__icon--error" />;
	}
	return (
		<div
			className={
				"notification notification--" +
				notification.type.toLowerCase() +
				(disappear ? " notification--disappear" : "")
			}
		>
			<div className="notification__icon-container">{icon}</div>
			<h3 className="notification__message">{notification.message}</h3>
		</div>
	);
}

export default Notification;

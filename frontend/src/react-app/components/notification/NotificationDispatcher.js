import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Notification from "./Notification";

function NotificationDispatcher() {
	const notification = useSelector((state) => state.notification.curr);
	return createPortal(
		<>{notification && <Notification />}</>,
		document.getElementById("root_notification")
	);
}

export default NotificationDispatcher;

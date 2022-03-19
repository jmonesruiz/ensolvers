import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Folders from "../pages/Folders";
import Tasks from "../pages/Tasks";
import NotificationDispatcher from "../components/notification/NotificationDispatcher";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route exact path="/" element={<Navigate to="folders" />} />
				<Route path="folders" element={<Folders />} />
				<Route path="tasks/:folderId" element={<Tasks />} />
				<Route path="*" element={<Navigate to="folders" />} />
			</Routes>
			<NotificationDispatcher />
		</div>
	);
}

export default App;

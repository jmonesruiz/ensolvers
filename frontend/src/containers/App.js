import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Folders from "../pages/Folders";
import ToDos from "../pages/ToDos";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route exact path="/" element={<Navigate to="folders" />} />
				<Route path="folders" element={<Folders />} />
				<Route path="todos/:folderId" element={<ToDos />} />
				<Route path="*" element={<Navigate to="folders" />} />
			</Routes>
		</div>
	);
}

export default App;

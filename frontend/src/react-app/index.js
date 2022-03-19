import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
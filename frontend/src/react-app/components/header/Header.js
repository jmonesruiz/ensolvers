import React from "react";
import "./Header.scss";
import { HiChevronRight as ChevronRight } from "react-icons/hi";
3;
import { Link } from "react-router-dom";

function Header(props) {
	return (
		<header className="header">
			{props.backTo ? (
				<Link to={props.backTo}>
					<h1 className="header__title">{props.title}</h1>
				</Link>
			) : (
				<h1 className="header__title">{props.title}</h1>
			)}
			{props.subtitle && (
				<>
					<ChevronRight className="header__connector" />
					<h2 className="header__subtitle">{props.subtitle}</h2>
				</>
			)}
		</header>
	);
}

export default Header;

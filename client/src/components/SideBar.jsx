import React from "react";
import { Link } from "react-router-dom";
const SideBar = (props) => {
	const type = props.type;
	return (
		<div
			className="d-flex flex-column justify-content-between bg-dark"
			style={{
				height: "75vh",
				width: "20vw",
				color: "whitesmoke",
			}}
		>
			<h3>All Ebooks</h3>
			<h3>Fictions</h3>
			<h3>Non Fictions</h3>
			<h3>Editor's Chocie</h3>
			<h3>Order History</h3>
			<h3>Account</h3>
			{type === 2 && (
				<Link to={"/adminpanel"} style={{textDecoration:'none', color:'white'}}>
					<h3>Admin Panel</h3>
				</Link>
			)}
		</div>
	);
};

export default SideBar;

import React from "react";
import { Link } from "react-router-dom";
const AdminPanel = () => {
	return (
		<div className="text-primary text-center">
			<h2 className="text-dark">Welcome to admin panel!</h2>
			<Link to={"/category"} style={{ textDecoration: "none" }}>
				<h3>Manage Category</h3>
			</Link>
			<Link to={"/catalog"} style={{ textDecoration: "none" }}>
				<h3>Manage Catalog</h3>
			</Link>
			<Link to={"/"} style={{ textDecoration: "none" }}>
				<h3>View Books On Loan</h3>
			</Link>
			<Link to={"/"} style={{ textDecoration: "none" }}>
				<h3>View Orders</h3>
			</Link>
			<Link to={"/manageuser"} style={{ textDecoration: "none" }}>
				<h3>Manage Users</h3>
			</Link>
		</div>
	);
};

export default AdminPanel;

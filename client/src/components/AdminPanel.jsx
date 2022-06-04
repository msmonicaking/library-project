import React from "react";
import { Link } from "react-router-dom";
const AdminPanel = (props) => {
	return (
		<div className="d-flex">
      <h2 className="text-center">Welcome to admin panel!</h2>
			<Link to={"/category"}>Manage Category</Link>
			<Link to={"/catalog"}>Manage Catalog</Link>
      <Link to={'/books'}>Manage Stock</Link>
      <Link to={'/users'}>Manage Users</Link>
		</div>
	);
};

export default AdminPanel;

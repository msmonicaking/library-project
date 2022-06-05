import React from "react";
import { Link } from "react-router-dom";
const SideBar = (props) => {
	const type = props.type;
	return (
		<div
			className="d-flex flex-column justify-content-between bg-dark text-center"
			style={{
				height: "75vh",
				width: "20vw",
				color: "whitesmoke",
			}}
		>
			<Link
				to={"/main"}
				style={{ textDecoration: "none", color: "whitesmoke" }}
			>
				<h3>All Books</h3>
			</Link>
			<Link
				to={"/fiction"}
				style={{ textDecoration: "none", color: "whitesmoke" }}
			>
				<h3>Fictions</h3>
			</Link>
			<Link
				to={"/nonfiction"}
				style={{ textDecoration: "none", color: "whitesmoke" }}
			>
				<h3>Non Fictions</h3>
			</Link>
			<Link
				to={"/nonfiction"}
				style={{ textDecoration: "none", color: "whitesmoke" }}
			>
				<h3>Order History</h3>
			</Link>
			<Link
				to={`/user/${props.user.userid}`}
				style={{ textDecoration: "none", color: "whitesmoke" }}
			>
				<h3>Account</h3>
			</Link>
			{type === 2 && (
				<Link
					to={"/adminpanel"}
					style={{ textDecoration: "none", color: "whitesmoke" }}
				>
					<h3>Admin Panel</h3>
				</Link>
			)}
		</div>
	);
};

export default SideBar;

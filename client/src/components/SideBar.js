import React from "react";

const SideBar = () => {
	return (
		<div
			className="d-flex flex-column justify-content-between"
			style={{
				height: "75vh",
				width: "20vw",
				backgroundColor: "navy",
				color: "whitesmoke",
			}}
		>
			<h3>All Ebooks</h3>
			<h3>Fictions</h3>
			<h3>Non Fictions</h3>
			<h3>Editor's Chocie</h3>
			<h3>Order History</h3>
			<h3>Account</h3>
		</div>
	);
};

export default SideBar;

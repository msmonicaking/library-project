import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import AdminPanel from "../components/AdminPanel";

const Admin = (props) => {
	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<AdminPanel></AdminPanel>
				</div>
			</div>
		</div>
	);
};

export default Admin;

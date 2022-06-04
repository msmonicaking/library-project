import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UserDetail from "../components/UserDetail";

const UserView = (props) => {
	const { id } = useParams();

	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<UserDetail id={id}></UserDetail>
				</div>
			</div>
		</div>
	);
};

export default UserView;

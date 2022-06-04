import React from "react";
import { useParams } from "react-router-dom";
import EditUser from "../components/EditUser";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const EditUserView = (props) => {
	const { id } = useParams();

	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<EditUser id={id} curid={props.user.userid} setUser={props.setUser}></EditUser>
				</div>
			</div>
		</div>
	);
};

export default EditUserView;
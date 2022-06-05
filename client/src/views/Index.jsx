/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (Object.keys(props.user).length === 0) {
			navigate("/");
		}
	}, []);

	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<Table></Table>
				</div>
			</div>
		</div>
	);
};

export default Index;

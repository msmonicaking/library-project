import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
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
			<Header user={props.user}></Header>
			<div className="d-flex bg-light">
				<SideBar></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<SearchBar></SearchBar>
					<Table></Table>
				</div>
			</div>
		</div>
	);
};

export default Index;

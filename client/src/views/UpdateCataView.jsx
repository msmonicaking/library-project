import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import UpdateCata from "../components/UpdateCata";
import { useParams } from "react-router-dom";

const UpdateCataView = (props) => {
	const { id } = useParams();
	return (
		<div className="text-center">
			<Header user={props.user}></Header>
			<div className="d-flex bg-light">
				<SideBar></SideBar>
				<div style={{ width: "80vw", height:'80vh' }} className="bg-light">
					<UpdateCata id={id}></UpdateCata>
				</div>
			</div>
		</div>
	);
};

export default UpdateCataView;

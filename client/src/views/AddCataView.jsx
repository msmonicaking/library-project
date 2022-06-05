import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import AddCatalog from "../components/AddCatalog";

const AddCataView = (props) => {
	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw", height: "80vh" }} className="bg-light">
					<AddCatalog />
				</div>
			</div>
		</div>
	);
};

export default AddCataView;

import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import CatalogDetail from "../components/CatalogDetail";
import { useParams } from "react-router-dom";

const BookView = (props) => {
	const { id } = useParams();
	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<CatalogDetail id={id} user={props.user}></CatalogDetail>
				</div>
			</div>
		</div>
	);
};

export default BookView;

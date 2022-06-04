import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = (props) => {
	const navi = useNavigate();
	const setUser = props.setUser;
	const handleLogOut = (e) => {
		e.preventDefault();
		setUser({});
		alert("You are successfuly logged out!");
		navi("/");
	};
	return (
		<div
			className="d-flex justify-content-around align-items-center"
			style={{ height: "20vh", width: "100vw", backgroundColor: "#AAAAAA" }}
		>
			<img
				src="https://thumbs.dreamstime.com/b/composite-image-slices-fruits-mango-kiwi-isolated-white-background-healthy-eating-concept-composite-image-161192866.jpg"
				alt="mangokiwi"
				style={{ width: "100px" }}
			/>

			<h1 className="text-light">MongoKiwi Ebook Library</h1>

			<div>
				<p className="text-light">
					Welcome,&nbsp;
					<Link to={`/user/${props.user.userid}`}>{props.user.username}</Link>
				</p>

				<button className="btn btn-danger" onClick={(e) => handleLogOut(e)}>
					Log out
				</button>
			</div>
		</div>
	);
};

export default Header;

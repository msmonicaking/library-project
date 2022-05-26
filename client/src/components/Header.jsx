import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<div
			className="d-flex justify-content-around align-items-center"
			style={{ height: "20vh", width: "100vw", backgroundColor:'#AAAAAA' }}
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
					<a href="/editUser">UserName</a>
				</p>
				<Link to={"/"}>
					<button className="btn btn-danger">Log out</button>
				</Link>
			</div>
		</div>
	);
};

export default Header;

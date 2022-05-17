import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<div
			className="d-flex justify-content-around align-items-center"
			style={{ height: "20vh", width: "100vw", backgroundColor: "orange" }}
		>
			<img
				src="https://thumbs.dreamstime.com/b/composite-image-slices-fruits-mango-kiwi-isolated-white-background-healthy-eating-concept-composite-image-161192866.jpg"
				alt="mangokiwi"
				style={{ width: "100px" }}
			/>

			<h1>MongoKiwi Ebook Library</h1>

			<div>
				<p>
					Welcome,&nbsp;
					<a href="/editUser">UserName</a>
				</p>
				<button className="btn btn-danger">Log out</button>
			</div>
		</div>
	);
};

export default Header;

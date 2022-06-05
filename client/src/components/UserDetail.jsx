import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../baseURL";
import { Link } from "react-router-dom";
const UserDetail = (props) => {
	const id = props.id;
	const [person, setPerson] = useState({});
	const [bookCount, setBookCount] = useState("");
	useEffect(() => {
		axios
			.get(baseURL + "users/id/" + id)
			.then((res) => {
				setPerson(res.data.data.user);
			})
			.catch((err) => console.log(err));
	}, [id]);

	useEffect(() => {
		axios
			.get(baseURL + "users/read/" + id)
			.then((res) => {
				setBookCount(res.data.data.bookcount.bookcount);
			})
			.catch((err) => console.log(err));
	}, [id, person]);
	return (
		<div>
			<div
				className="card bg-light"
				style={{
					width: "25rem",
					height: "25rem",
					margin: "auto",
					marginTop: "5%",
				}}
			>
				<div style={{ margin: "auto" }}>
					<i className="fa-solid fa-user-large card-img-top fa-8x"></i>
					<div className="card-body">
						<h5 className="card-title">
							{person.firstname + " " + person.lastname}
						</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							@{person.username}
						</h6>
						<p className="card-text">TEL: {person.phonenumber}</p>
						<p className="card-text">Email: {person.email}</p>
						<h6 className="card-subtitle mb-2 text-muted">
							You have read {bookCount} book(s).
						</h6>
						<Link to={`/user/edit/${id}`}>
							<button className="btn btn-primary">Edit</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetail;

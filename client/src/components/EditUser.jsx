import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../baseURL";

const EditUser = (props) => {
	const id = props.id;
	const currentUser = props.curid;
	const navigate = useNavigate();
	const [temp, setTemp] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	useEffect(() => {
		axios
			.get(baseURL + "users/id/" + id)
			.then((res) => {
				setFirstname(res.data.data.user.firstname);
				setLastname(res.data.data.user.lastname);
				setEmail(res.data.data.user.email);
				setPhone(res.data.data.user.phonenumber);
				setTemp(
					res.data.data.user.firstname + " " + res.data.data.user.lastname
				);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const handleDelete = (e) => {
    e.preventDefault();
		if (window.confirm("Are you sure you want to delete this account?")) {
			axios.put(`${baseURL}users/deleted/${id}`).then((res) => {
				console.log(res);
				if (currentUser === id) {
					props.setUser({});
					navigate("/");
				} else {
					navigate('/manageuser');
				}
			});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(baseURL + "users/" + id, {
				firstname,
				lastname,
				email,
				phonenumber: phone,
			})
			.then((res) => {
				console.log(res);
				alert("Update Successfully!");
				navigate(-1);
			})
			.catch((err) => {
				console.log("error", err.response);
			});
	};

	return (
		<div className="text-center">
			<h2>Edit {temp} Profile</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div style={{ width: "50%", margin: "auto" }} className="text-start">
					<div className="mb-3">
						<label htmlFor="firstname" className="form-label">
							Firstname*
						</label>
						<input
							type="text"
							className="form-control"
							id="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="lastname" className="form-label">
							Lastname*
						</label>
						<input
							type="text"
							className="form-control"
							id="lastname"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address*
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="phone" className="form-label">
							Phone Number*
						</label>
						<input
							type="text"
							className="form-control"
							id="phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="d-flex">
						<input
							type="submit"
							value="Update"
							className="btn btn-success"
							style={{ marginRight: "15px" }}
						/>
						<button className="btn btn-danger" onClick={(e) => handleDelete(e)}>
							Delete
						</button>
					</div>

					<div className="form-text text-danger">
						* indicates required field
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditUser;

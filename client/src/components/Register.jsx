import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
	const setUser = props.setUser;
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/api/users", {
				firstname,
				lastname,
				username,
				usertypeid: 1,
				email,
				phonenumber: phone,
				isdeleted: false,
				password,
			})
			.then((res) => {
				console.log(res);
				setUser({
					userid: res.data.data.user.id,
					username: res.data.data.user.username,
				});
				navigate("/main");
			})
			.catch((err) => {
				console.log("error", err.response);
			});
	};
	return (
		<div className="text-center">
			<h1 className="text-success">Register to MongoKiwi Ebooks</h1>
			<p className="text-warning">
				As a memeber, you can access to the most popular ebooks! Always
				instantly delivery!
			</p>
			<form onSubmit={handleSubmit}>
				<div style={{ width: "50%", margin: "auto" }} className="text-start">
					<div className="form-text text-center text-danger">
						We'll never share your infomation with anyone else.
					</div>
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
						<label htmlFor="username" className="form-label">
							Username*
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password*
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input
						type="submit"
						value="Create Account"
						className="btn btn-primary"
					/>
					<div className="form-text text-danger">
						* indicates required field
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;

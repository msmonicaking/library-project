import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = (props) => {
	const setUser = props.setUser;
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get("http://localhost:8080/api/users/" + email)
			.then((user) => {
				const pw = user.data.data.user.pw;
				if (password === pw) {
					setUser({
						userid: user.data.data.user.id,
						username: user.data.data.user.username,
					});
					navigate("/main");
				} else {
					setEmail("");
					setPassword("");
					window.alert("Your account does not match the password!");
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				backgroundSize: "100vw 100vh",
			}}
		>
			<h1 style={{ color: "#6610f2" }} className="text-center">
				Welcome to MongoKiwi Ebook Shop!
			</h1>
			<div style={{ width: "50%", margin: "auto" }}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input type="submit" value="Login" className="btn btn-primary" />
				</form>
				<br></br>
				<Link to={"/register"}>Click here to register!</Link>
				<br />
				<Link to={"/main"}>To main page(for testing only)</Link>
			</div>
		</div>
	);
};

export default Login;

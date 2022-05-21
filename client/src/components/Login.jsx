import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
	return (
		<div>
			<h1 style={{ color: "#6610f2" }} className='text-center'>
				Welcome to MongoKiwi Ebook Shop!
			</h1>
			<div style={{ width: "50%", margin: "auto" }}>
				<div className="mb-3">
					<label for="email" className="form-label">
						Email address
					</label>
					<input type="email" className="form-control" id="email" />
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label for="password" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="password" />
				</div>
				<input type="submit" value="Login" className="btn btn-primary" />
				<br></br>
				<Link to={'/register'}>Click here to register!</Link>
        <br />
        <Link to={'/main'}>To main page(for testing only)</Link>
			</div>
		</div>
	);
};

export default Login;

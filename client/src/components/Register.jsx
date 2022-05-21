import React from "react";
const Register = () => {
	return (
		<div className="text-center">
			<h1 className="text-success">Register to MongoKiwi Ebooks</h1>
			<p className="text-warning">
				As a memeber, you can access to the most popular ebooks! Always
				instantly delivery!
			</p>
			<form action="">
				<div style={{ width: "50%", margin: "auto" }} className="text-start">
					<div className="form-text text-center text-danger">
						We'll never share your infomation with anyone else.
					</div>
					<div className="mb-3">
						<label for="username" className="form-label">
							Username*
						</label>
						<input type="text" className="form-control" id="username" />
					</div>
					<div className="mb-3">
						<label for="email" className="form-label">
							Email address*
						</label>
						<input type="email" className="form-control" id="email" />
					</div>
					<div className="mb-3">
						<label for="phone" className="form-label">
							Phone Number*
						</label>
						<input type="text" className="form-control" id="phone" />
					</div>
					<div className="mb-3">
						<label for="address" className="form-label">
							Address*
						</label>
						<input type="text" className="form-control" id="address" />
					</div>
					<div className="mb-3">
						<label for="city" className="form-label">
							City*
						</label>
						<input type="text" className="form-control" id="city" />
					</div>
					<div className="mb-3">
						<label for="state" className="form-label">
							State*
						</label>
						<input type="text" className="form-control" id="state" />
					</div>
					<div className="mb-3">
						<label for="password" className="form-label">
							Password*
						</label>
						<input type="password" className="form-control" id="password" />
					</div>
					<input type="submit" value="Create Account" className="btn btn-primary" />
					<div className="form-text text-danger">
						* indicates required field
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;

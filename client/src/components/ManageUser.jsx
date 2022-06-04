import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../baseURL";
import Header from "./Header";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const ManageUser = (props) => {
	const { user, setUser } = props;
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios
			.get(`${baseURL}users`)
			.then((res) => {
				setUsers(res.data.data.user);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Header user={user} setUser={setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={user.usertype}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<h2 className="mb-4 text-center text-success">All Users</h2>
					<table
						className="table table-bordered"
						style={{ width: "80%", margin: "auto" }}
					>
						<thead>
							<tr>
								<th scope="col">First Name</th>
								<th scope="col">Last Name</th>
								<th scope="col">Username</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col">Usertype</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((oneUser, idx) => {
								return (
									<tr key={oneUser.id}>
										<td>{oneUser.firstname}</td>
										<td>{oneUser.lastname}</td>
										<td>{oneUser.username}</td>
										<td>{oneUser.email}</td>
										<td>{oneUser.phonenumber}</td>
										{parseInt(oneUser.usertypeid) === 1 ? (
											<td>Reader</td>
										) : (
											<td>Admin</td>
										)}
										<td>
											<Link to={`/user/${oneUser.id}`}>
												<button className="btn btn-warning btn-sm text-secondary">
													View
												</button>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ManageUser;

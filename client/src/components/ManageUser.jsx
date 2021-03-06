import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../baseURL";
import Header from "./Header";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const ManageUser = (props) => {
	const { user, setUser } = props;
	const [users, setUsers] = useState([]);
	const [paginatedUsers, setPaginatedUsers] = useState([]);
	const pageSize = 5;
	const pageCount = Math.ceil(users.length / pageSize);
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
	const [curPage, setCurPage] = useState(1);
	useEffect(() => {
		axios
			.get(`${baseURL}users`)
			.then((res) => {
				const temp = res.data.data.user;
				setUsers(temp);
				setPaginatedUsers(temp.slice(0, 5));
			})
			.catch((err) => console.log(err));
	}, []);

	const handlePage = (pageNo) => {
		const index = (pageNo - 1) * pageSize;
		const orders = users.slice(index, index + 5);
		setPaginatedUsers(orders);
		setCurPage(pageNo);
	};

	const handleBackPage = () => {
		const index = (curPage - 2) * pageSize;
		const orders = users.slice(index, index + 5);
		setPaginatedUsers(orders);
		setCurPage(curPage - 1);
	};

	const handleForwardPage = () => {
		const index = curPage * pageSize;
		const orders = users.slice(index, index + 5);
		setPaginatedUsers(orders);
		setCurPage(curPage + 1);
	};

	return (
		<div>
			<Header user={user} setUser={setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
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
							{paginatedUsers.map((oneUser, idx) => {
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
					<nav className="d-flex justify-content-center align-items-center mt-3">
						<ul className="pagination">
							<li
								className={curPage === 1 ? "page-item disabled" : "page-item"}
							>
								<p
									className="page-link"
									style={{ cursor: "pointer" }}
									onClick={() => handleBackPage()}
								>
									<i className="fa-solid fa-angles-left"></i>
								</p>
							</li>
							{pages.map((page, idx) => (
								<li
									className={
										page === curPage ? "page-item active" : "page-item"
									}
									key={idx}
								>
									<p
										className="page-link"
										onClick={() => handlePage(page)}
										style={{
											cursor: "pointer",
										}}
									>
										{page}
									</p>
								</li>
							))}
							<li
								className={
									curPage === pageCount ? "page-item disabled" : "page-item"
								}
							>
								<p
									className="page-link"
									style={{ cursor: "pointer" }}
									onClick={() => handleForwardPage()}
								>
									<i className="fa-solid fa-angles-right"></i>
								</p>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default ManageUser;

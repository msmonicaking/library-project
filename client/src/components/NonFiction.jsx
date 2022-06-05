/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import baseURL from "../baseURL";
const NonFiction = (props) => {
	const user = props.user;
	const [catalog, setCatalog] = useState([]);
	const [paginatedBooks, setPaginatedBooks] = useState([]);
	const pageSize = 5;
	const pageCount = Math.ceil(catalog.length / pageSize);
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
	const [curPage, setCurPage] = useState(1);

	const handlePage = (pageNo) => {
		const index = (pageNo - 1) * pageSize;
		const books = catalog.slice(index, index + 5);
		setPaginatedBooks(books);
		setCurPage(pageNo);
	};

	const handleBackPage = () => {
		const index = (curPage - 2) * pageSize;
		const books = catalog.slice(index, index + 5);
		setPaginatedBooks(books);
		setCurPage(curPage - 1);
	};

	const handleForwardPage = () => {
		const index = curPage * pageSize;
		const books = catalog.slice(index, index + 5);
		setPaginatedBooks(books);
		setCurPage(curPage + 1);
	};

	useEffect(() => {
		axios
			.get(baseURL + "catalogcard/nonfiction")
			.then((res) => {
				const temp = res.data.data.catalogcard;
				temp.forEach((cat) => {
					axios
						.get(baseURL + "catalogcard/stock/" + cat.id)
						.then((re) => {
							cat.stock = parseInt(re.data.stock.stock);
							setCatalog(temp);
							setPaginatedBooks(temp.slice(0, 5));
						})
						.catch((err) => console.log(err));
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<Header user={user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<h1 className="mb-4 text-center">All Non-Fictions</h1>
					<table
						className="table table-bordered"
						style={{ width: "80%", margin: "auto" }}
					>
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Author</th>
								<th scope="col">Category</th>
								<th scope="col">ISBN</th>
								<th scope="col">Stock</th>
							</tr>
						</thead>
						<tbody>
							{paginatedBooks.map((cat, idx) => {
								return (
									<tr key={cat.id}>
										<td>
											<Link to={`/book/${cat.id}`}>{cat.title}</Link>
										</td>
										<td>{cat.firstname + " " + cat.lastname}</td>
										<td>{cat.category}</td>
										<td>{cat.isbn}</td>
										<td>
											<div className="d-flex align-items-center">
												{cat.stock}
											</div>
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

export default NonFiction;

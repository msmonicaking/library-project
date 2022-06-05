import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../baseURL";
import Header from "./Header";
import SideBar from "./SideBar";

const BorrowedBook = (props) => {
	const [books, setBooks] = useState([]);
	const [paginatedBooks, setPaginatedBooks] = useState([]);
	const pageSize = 5;
	const pageCount = Math.ceil(books.length / pageSize);
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
	const [curPage, setCurPage] = useState(1);

	useEffect(() => {
		axios
			.get(baseURL + "orders")
			.then((res) => {
				const temp = res.data.data.orders;
				setBooks(temp);
				setPaginatedBooks(temp.slice(0, 5));
			})
			.catch((err) => console.log(err));
	}, []);

	const handlePage = (pageNo) => {
		const index = (pageNo - 1) * pageSize;
		const orders = books.slice(index, index + 5);
		setPaginatedBooks(orders);
		setCurPage(pageNo);
	};

	const handleBackPage = () => {
		const index = (curPage - 2) * pageSize;
		const orders = books.slice(index, index + 5);
		setPaginatedBooks(orders);
		setCurPage(curPage - 1);
	};

	const handleForwardPage = () => {
		const index = curPage * pageSize;
		const orders = books.slice(index, index + 5);
		setPaginatedBooks(orders);
		setCurPage(curPage + 1);
	};

	return (
		<div>
			<Header user={props.user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<h2 className="mb-4 text-center text-success">All Books On Loan</h2>
					<table
						className="table table-bordered"
						style={{ width: "80%", margin: "auto" }}
					>
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Author</th>
								<th scope="col">Reader Name</th>
								<th scope="col">Reader Username</th>
								<th scope="col">Date Out</th>
								<th scope="col">Return By</th>
							</tr>
						</thead>
						<tbody>
							{paginatedBooks.map((book, idx) => {
								return (
									<tr key={book.id}>
										<td>{book.title}</td>
										<td>{book.authorfn + " " + book.authorln}</td>
										<td>{book.firstname + " " + book.firstname}</td>
										<td>{book.username}</td>
										<td>{book.dateout.split("T")[0]}</td>
										<td>{book.returnby.split("T")[0]}</td>
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

export default BorrowedBook;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import baseURL from "../baseURL";
const Catalog = (props) => {
	const user = props.user;
	const [catalog, setCatalog] = useState([]);
	const [paginatedBooks, setPaginatedBooks] = useState([]);
	const pageSize = 5;
	const pageCount = Math.ceil(catalog.length / pageSize);
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
	const [curPage, setCurPage] = useState(1);

	const increaseStock = (catalogId) => {
		console.log(catalogId)
		axios.post(baseURL + "books", { catalogid: catalogId }).then((res) => {
			console.log(res.data.data.books);
			const newCatalog = catalog.map((cat, idx) => {
				if (catalogId === cat.id) {
					const temp = { ...cat };
					temp.stock += 1;
					return temp;
				} else {
					return cat;
				}
			});
			const newPage = paginatedBooks.map((cat, idx) => {
				if (catalogId === cat.id) {
					const temp = { ...cat };
					temp.stock += 1;
					return temp;
				} else {
					return cat;
				}
			});
			setCatalog(newCatalog);
			setPaginatedBooks(newPage);
		});
	};

	const decreaseStock = (catalogId) => {};
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
			.get("http://localhost:8080/api/catalogcard")
			.then((res) => {
				const temp = res.data.data.catalogcard;
				temp.forEach((cat) => {
					axios
						.get("http://localhost:8080/api/catalogcard/stock/" + cat.id)
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

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want delete this catalog?")) {
			axios
				.delete("http://localhost:8080/api/catalogcard/" + id)
				.then((res) => {
					console.log(res);
					const deletedAry = catalog.filter((item) => item.id !== id);
					setCatalog(deletedAry);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div>
			<Header user={user} setUser={props.setUser}></Header>
			<div className="d-flex bg-light">
				<SideBar type={user.usertype}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<h1 className="mb-4 text-center">Catalog Management</h1>
					<Link to={"/catalog/add"}>
						<button
							className="btn btn-primary mb-3"
							style={{ marginLeft: "10%" }}
						>
							Add Catalog
						</button>
					</Link>
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
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{paginatedBooks.map((cat, idx) => {
								return (
									<tr key={cat.id}>
										<td>{cat.title}</td>
										<td>{cat.firstname + " " + cat.lastname}</td>
										<td>{cat.category}</td>
										<td>{cat.isbn}</td>
										<td>
											<div className="d-flex align-items-center">
												{cat.stock}
												<i
													className="fa-solid fa-plus border border-primary rounded-circle"
													style={{
														marginLeft: "10px",
														marginRight: "10px",
														color: "blue",
														cursor: "pointer",
														padding: "5px",
													}}
													onClick={ () => increaseStock(cat.id)}
												></i>
												<i
													className="fa-solid fa-minus border border-danger rounded-circle"
													style={{
														color: "red",
														cursor: "pointer",
														padding: "5px",
													}}
												></i>
											</div>
										</td>
										<td className="d-flex">
											<Link to={"/catalog/" + cat.id}>
												<button className="btn btn-success">Update</button>
											</Link>
											<button
												className="btn btn-danger"
												onClick={() => handleDelete(cat.id)}
												style={{ marginLeft: "20px" }}
											>
												Delete
											</button>
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

export default Catalog;

import React, { useState } from "react";

const Table = () => {
	const data = [
		{
			title: "The Great Gatsby",
			author: "F. Scott Fitzgerald",
			category: "Fiction",
			isbn: "9780333791035",
			stock: 10,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title:
				"Intro to Python for Computer Science and Data Science: Learning to Program with AI, Big Data and The Cloud, 1st edition",
			author: "Paul Deitel",
			category: "Non Fiction",
			isbn: "9780135404676",
			stock: 7,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
		{
			title: "The Joy Luck Club",
			author: "Amy Tan",
			category: "Fiction",
			isbn: "9780143038092",
			stock: 5,
		},
	];
	const pageSize = 5;
	const pageCount = Math.ceil(data.length / pageSize);
	const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
	const [paginatedBooks, setPaginatedBooks] = useState(data.slice(0, 5));
	const handlePage = (pageNo) => {
		const index = (pageNo - 1) * pageSize;
		const books = data.slice(index, index + 5);
		setPaginatedBooks(books);
		setCurPage(pageNo);
	};

	const handleBackPage = () => {
		setCurPage(curPage - 1);
		const index = (curPage - 1) * pageSize;
		const books = data.slice(index, index + 5);
		setPaginatedBooks(books);
	};

	const handleForwardPage = () => {
		setCurPage(curPage + 1);
		const index = (curPage - 1) * pageSize;
		const books = data.slice(index, index + 5);
		setPaginatedBooks(books);
	};

	const [curPage, setCurPage] = useState(1);
	return (
		<>
			<table className="table" style={{ width: "80%", margin: "auto" }}>
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
					{paginatedBooks.map((book, idx) => (
						<tr key={idx}>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.category}</td>
							<td>{book.isbn}</td>
							<td>{book.stock}</td>
						</tr>
					))}
				</tbody>
			</table>
			<nav className="d-flex justify-content-center align-items-center mt-3">
				<ul className="pagination">
					<li className={curPage === 1 ? "page-item disabled" : "page-item"}>
						<p
							className="page-link"
							style={{ cursor: "pointer" }}
							onClick={() => handleBackPage()}
						>
							<i class="fa-solid fa-angles-left"></i>
						</p>
					</li>
					{pages.map((page, idx) => (
						<li
							className={page === curPage ? "page-item active" : "page-item"}
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
							<i class="fa-solid fa-angles-right"></i>
						</p>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Table;

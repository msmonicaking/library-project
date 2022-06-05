import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../baseURL";

const CatalogDetail = (props) => {
	// cat_id
	const id = props.id;
	const [book, setBook] = useState({});
	const [stock, setStock] = useState(0);
	const [availableBook, setAvailableBook] = useState(-1);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(baseURL + "catalogcard/" + id)
			.then((res) => {
				setBook(res.data.book);
			})
			.catch((err) => console.log(err));
	}, [id]);

	useEffect(() => {
		axios
			.get(baseURL + "catalogcard/stock/" + id)
			.then((res) => {
				setStock(parseInt(res.data.stock.stock));
			})
			.catch((err) => console.log(err));
	}, [id, book]);

	useEffect(() => {
		if (book.id === undefined) return;
		axios
			.get(baseURL + "book/get/" + book.id)
			.then((res) => {
				setAvailableBook(parseInt(res.data.data.book.id));
			})
			.catch((err) => console.log(err));
	}, [id, book]);
	const handleBorrow = () => {
		axios
			.all([
				axios.post(baseURL + "checkout", {
					userid: props.user.userid,
					bookid: availableBook,
				}),
				axios.put(baseURL + "book/" + availableBook),
			])
			.then(
				axios.spread((res1, res2) => {
					console.log(res1);
					console.log(res2);
					alert(`The Kindle Link for '${book.title}' is sent to your Email!`);
					navigate("/main");
				})
			)
			.catch((errs) => console.log(errs));
	};

	const handleWait = (e) => {
		e.preventDefault();
		alert("You will receive an email notify once the book is available!");
		navigate("/main");
	};

	return (
		<div
			className="card bg-light"
			style={{ margin: "auto", marginTop: "10px", width: "80%" }}
		>
			<i
				className="fa-solid fa-book card-img-top fa-8x"
				style={{ marginTop: "2%" }}
			></i>
			<div className="card-body">
				<h5 className="card-title">{book.title}</h5>
				<h6 class="card-subtitle mb-2 text-muted">
					By {book.firstname + " " + book.lastname}
				</h6>
				<p className="card-text">{book.description}</p>
			</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item bg-light">Category: {book.category}</li>
				<li className="list-group-item bg-light">ISBN: {book.isbn}</li>
				<li className="list-group-item bg-light">Available Stock: {stock}</li>
			</ul>
			<div className="card-body">
				{stock > 0 ? (
					<button className="btn btn-success" onClick={() => handleBorrow()}>
						Borrow
					</button>
				) : (
					<button className="btn btn-success" onClick={(e) => handleWait(e)}>
						Join Wait List
					</button>
				)}
			</div>
		</div>
	);
};

export default CatalogDetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCatalog = (props) => {
	const [title, setTitle] = useState("");
	const [FN, setFN] = useState("");
	const [LN, setLN] = useState("");
	const [cate, setCate] = useState(0);
	const [authorid, setAuthorid] = useState(-1);
	const [isbn, setIsbn] = useState("");
	const [category, setCategory] = useState([]);
	const [description, setDescription] = useState("");
	const navi = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:8080/api/category")
			.then((res) => {
				setCategory(res.data.categories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		// check if the author exists in DB
		var author_id = authorid;
		axios
			.get(`http://localhost:8080/api/author/${FN}/${LN}`)
			.then((res) => {
				if (Object.keys(res.data.data).length === 0) {
					axios
						.post("http://localhost:8080/api/author", {
							firstname: FN,
							lastname: LN,
						})
						.then((res) => {
							author_id = res.data.data.author.id;
							console.log(author_id);
							setAuthorid(res.data.data.author.id);
							handleAddCat(author_id);
						})
						.catch((err) => console.log(err));
				} else {
					author_id = res.data.data.author.id;
					console.log(author_id);
					setAuthorid(res.data.data.author.id);
					handleAddCat(author_id);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleAddCat = (author_id) => {
		// title, authorid, categoryid, isbn, description
		console.log(author_id);
		axios
			.post("http://localhost:8080/api/catalogcard/", {
				title,
				authorid: author_id,
				categoryid: parseInt(cate),
				isbn,
				description,
			})
			.then((res) => {
				window.alert("Add Successfully!");
				console.log(res);
				navi("/catalog");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<div className="text-center">
				<h1 className="text-success">Add Catalog</h1>
				<form
					onSubmit={(e) => handleSubmit(e)}
					style={{ overflow: "scroll", height: "68vh" }}
				>
					<div style={{ width: "50%", margin: "auto" }} className="text-start">
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								Title*
							</label>
							<input
								type="text"
								className="form-control"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="FN" className="form-label">
								Author's First Name*
							</label>
							<input
								type="text"
								className="form-control"
								id="FN"
								value={FN}
								onChange={(e) => setFN(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="LN" className="form-label">
								Author's Last Name*
							</label>
							<input
								type="text"
								className="form-control"
								id="LN"
								value={LN}
								onChange={(e) => setLN(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="cate" className="form-label">
								Category*
							</label>
							<select
								className="form-control form-select"
								id="cate"
								onChange={(e) => setCate(e.target.value)}
							>
								<option value="">Select a Category</option>
								{category.map((cat, idx) => {
									return (
										<option value={cat.id} key={cat.id}>
											{cat.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<label htmlFor="isbn" className="form-label">
								ISBN*
							</label>
							<input
								type="text"
								className="form-control"
								id="isbn"
								value={isbn}
								onChange={(e) => setIsbn(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Description (MAX 255 characters)
							</label>
							<textarea
								className="form-control"
								id="description"
								rows="3"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className="d-flex">
							<input
								type="submit"
								value="Add"
								className="btn btn-primary"
								style={{ marginRight: "20px" }}
							/>
							<button
								className="btn btn-danger"
								onClick={() => navi("/catalog")}
							>
								Cancel
							</button>
						</div>
						<div className="form-text text-danger">
							* indicates required field
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCatalog;

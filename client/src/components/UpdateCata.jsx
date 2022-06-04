/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateCata = (props) => {
	const id = props.id;
	const [tempTitle, setTempTitle] = useState("");
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
			.get("http://localhost:8080/api/catalogcard")
			.then((res) => {
				const cata = res.data.data.catalogcard.filter(
					(item) => item.id === parseInt(id)
				);
				console.log(cata[0]);
				setTitle(cata[0].title);
				setFN(cata[0].firstname);
				setLN(cata[0].lastname);
				setCate(cata[0].categoryid);
				setIsbn(cata[0].isbn);
				setTempTitle(cata[0].title);
				setDescription(cata[0].description);
				setAuthorid(cata[0].authorid);
			})
			.catch((err) => {
				console.log(err);
			});
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
							handleUpdate(author_id);
						})
						.catch((err) => console.log(err));
				} else {
					author_id = res.data.data.author.id;
					console.log(author_id);
					setAuthorid(res.data.data.author.id);
					handleUpdate(author_id);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleUpdate = (author_id) => {
		// title, authorid, categoryid, isbn, description
		console.log(author_id);
		axios
			.put("http://localhost:8080/api/catalog/" + id, {
				title,
				authorid: author_id,
				categoryid: parseInt(cate),
				isbn,
				description,
			})
			.then((res) => {
				window.alert("Update Successfully!");
				console.log(res);
				navi("/catalog");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="text-center">
			<h1 className="text-success">Update {tempTitle}</h1>
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
							{category.map((cat, idx) => {
								return cat.id === cate ? (
									<option value={cat.id} defaultValue key={cat.id}>
										{cat.name}
									</option>
								) : (
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
							value="Update Catalog"
							className="btn btn-primary"
              style={{marginRight : '20px'}}
						/>
            <button className="btn btn-danger" onClick={() => navi('/catalog')}>Cancel</button>
					</div>
					<div className="form-text text-danger">
						* indicates required field
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateCata;

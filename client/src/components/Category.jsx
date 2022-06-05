import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import SideBar from "./SideBar";
const Category = (props) => {
	const user = props.user;
	const [cate, setCate] = useState("");
	const [category, setCategory] = useState([]);
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
	const handleAdd = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/api/category", {
				name: cate,
			})
			.then((res) => {
				console.log(res);
				setCate("");
				setCategory(category.concat([res.data.data.category]));
			})
			.catch((err) => {
				console.log("error", err.response);
			});
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			axios
				.delete("http://localhost:8080/api/category/" + id)
				.then((res) => {
					console.log(res);
					const deletedAry = category.filter((item) => item.id !== id);
					setCategory(deletedAry);
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
				<SideBar type={props.user.usertype} user={props.user}></SideBar>
				<div style={{ width: "80vw" }} className="bg-light">
					<h2 className="mb-4 text-center">Category Management</h2>
					<table
						className="table table-bordered"
						style={{ width: "80%", margin: "auto" }}
					>
						<thead>
							<tr>
								<th scope="col">Category Name</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{category.map((cat, idx) => {
								return (
									<tr key={cat.id}>
										<td>{cat.name}</td>
										<td className="d-flex">
											<button
												className="btn btn-danger"
												onClick={() => handleDelete(cat.id)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<form
						onSubmit={(e) => handleAdd(e)}
						style={{ width: "50%", marginLeft: "10%" }}
						className="mt-5"
					>
						<div className="d-flex justify-content-start">
							<input
								type="text"
								name="cate"
								id="cate"
								className="form-control"
								value={cate}
								onChange={(e) => {
									setCate(e.target.value);
								}}
							/>
							<input
								type="submit"
								value="Add Category"
								className="btn btn-success"
								style={{ marginLeft: "20px" }}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Category;

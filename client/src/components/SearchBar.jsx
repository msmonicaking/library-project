import React, { useState } from "react";

const SearchBar = (props) => {
	const { restart, setRestart, paginatedBooks, catalog, setCatalog, setPaginatedBooks } =
		props;
	const [serachBy, setSearchBy] = useState("");
	const [val, setVal] = useState("");
	const handleSearch = (e) => {
		e.preventDefault();
		if (serachBy === "author") {
			const newCata = catalog.filter(
				(cat) => (cat.firstname + " " + cat.lastname).trim() === val.trim()
			);
			console.log(newCata);
			const newPag = paginatedBooks.filter(
				(cat) => (cat.firstname + " " + cat.lastname).trim() === val.trim()
			);

			setVal("");
			setCatalog(newCata);
			setPaginatedBooks(newPag);
		} else {
			const newCata = catalog.filter(
				(cat) => cat[serachBy].trim() === val.trim()
			);
			console.log(newCata);
			const newPag = paginatedBooks.filter(
				(cat) => cat[serachBy].trim() === val.trim()
			);

			setVal("");
			setCatalog(newCata);
			setPaginatedBooks(newPag);
		}
	};
	return (
		<div>
			<nav className="navbar">
				<div className="container-fluid">
					<form
						className="d-flex"
						role="search"
						style={{ margin: "auto" }}
						onSubmit={(e) => handleSearch(e)}
					>
						<input
							className="form-control"
							type="text"
							placeholder="Search"
							aria-label="Search"
							value={val}
							onChange={(e) => setVal(e.target.value)}
						/>
						<select
							className="form-select me-2"
							onChange={(e) => setSearchBy(e.target.value)}
						>
							<option value="">Select critiria to search</option>
							<option value="title">Title</option>
							<option value="author">Author</option>
							<option value="isbn">ISBN</option>
						</select>
						{val.length === 0 || serachBy.length === 0 ? (
							<input
								type="submit"
								value="Search"
								className="btn btn-outline-success"
								disabled
							/>
						) : (
							<input
								type="submit"
								value="Search"
								className="btn btn-outline-success"
							/>
						)}
						<button
							className="btn btn-outline-primary"
							style={{ marginLeft: "5px" }}
							onClick={() => setRestart(restart + 1)}
						>
							Restart
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
};

export default SearchBar;

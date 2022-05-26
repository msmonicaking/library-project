import React from "react";

const SearchBar = () => {
	return (
		<div>
			<nav className="navbar">
				<div className="container-fluid">
					<form className="d-flex" role="search" style={{ margin: "auto" }}>
						<input
							className="form-control"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<select className="form-select me-2">
							<option value=''>Select critiria to search</option>
							<option value="title">Title</option>
							<option value="author">Author</option>
							<option value="isbn">ISBN</option>
						</select>
						<input
							type="submit"
							value="Search"
							className="btn btn-outline-success"
						/>
					</form>
				</div>
			</nav>
		</div>
	);
};

export default SearchBar;

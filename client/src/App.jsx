import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./views/Admin";
import Catalog from "./components/Catalog";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import AddCataView from "./views/AddCataView";
import Index from "./views/Index";
import UpdateCataView from "./views/UpdateCataView";
import ManageUser from "./components/ManageUser";
import UserView from "./views/UserView";
import EditUserView from "./views/EditUserView";
import BookView from "./views/BookView";
import Fiction from "./components/Fictions";
import NonFiction from "./components/NonFiction";

function App() {
	const [user, setUser] = useState({});
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Login user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/register"
					element={<Register user={user} setUser={setUser} />}
				></Route>

				{/* Main Page, Display All Books */}
				<Route
					path="/main"
					element={<Index user={user} setUser={setUser} />}
				></Route>

				{/* Display All Fictions */}
				<Route
					path="/fiction"
					element={<Fiction user={user} setUser={setUser} />}
				></Route>

				{/* Display All Non-Fictions */}
				<Route
					path="/nonfiction"
					element={<NonFiction user={user} setUser={setUser} />}
				></Route>
				{/* User Detail */}
				<Route
					path="/user/:id"
					element={<UserView user={user} setUser={setUser} />}
				></Route>

				{/* Edit User */}
				<Route
					path="/user/edit/:id"
					element={<EditUserView user={user} setUser={setUser} />}
				></Route>

				{/* View A Book */}
				<Route
					path="/book/:id"
					element={<BookView user={user} setUser={setUser} />}
				></Route>

				{/* Admin Section */}
				<Route
					path="/adminpanel"
					element={<Admin user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/category"
					element={<Category user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/catalog"
					element={<Catalog user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/catalog/:id"
					element={<UpdateCataView user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/catalog/add"
					element={<AddCataView user={user} setUser={setUser} />}
				></Route>
				<Route
					path="/manageuser"
					element={<ManageUser user={user} setUser={setUser} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

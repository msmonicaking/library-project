import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Catalog from "./components/Catalog";
import Category from "./components/Category";
import Login from "./components/Login";
import Register from "./components/Register";
import AddCataView from "./views/AddCataView";
import Index from "./views/Index";
import UpdateCataView from "./views/UpdateCataView";

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
				<Route path="/main" element={<Index user={user} />}></Route>
				<Route path="/category" element={<Category />}></Route>
				<Route path="/catalog" element={<Catalog />}></Route>
				<Route
					path="/catalog/:id"
					element={<UpdateCataView user={user} />}
				></Route>
								<Route
					path="/catalog/add"
					element={<AddCataView user={user} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

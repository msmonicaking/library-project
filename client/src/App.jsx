import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Index from "./views/Index";

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
				<Route
					path="/main"
					element={<Index user={user} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

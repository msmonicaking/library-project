import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Index from "./views/Index";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />}></Route>
                <Route path="/register" element={<Register/>}></Route>
				<Route path="/main" element={<Index />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

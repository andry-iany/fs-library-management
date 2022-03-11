import "./App.css";
import { Home } from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import RentalDetail from "./components/Main/RentalDetail";
import {
	FormRentalReturn,
	FormRentalRent,
	FormAddUser,
} from "./components/Main/Form";

function App() {
	return (
		<div className="App py-4 text-secondary bg-primary-cust">
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index element={<Navigate to="/rental/" />} />
					<Route path="/rental" element={<RentalDetail />} />
					<Route path="/rental/rent" element={<FormRentalRent />} />
					<Route path="/rental/return" element={<FormRentalReturn />} />
					<Route path="/users/register" element={<FormAddUser />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

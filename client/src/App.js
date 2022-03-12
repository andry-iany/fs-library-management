import "./App.css";
import { Login } from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { getRoutesForHome } from "./pages/Home";
import AuthContext from "./contexts/AuthContext";
import {
	AuthenticatedRoute,
	NonAuthenticatedRoute,
} from "./components/Authentication";
import { useContext } from "react";

function App() {
	const { loginInfo } = useContext(AuthContext);

	return (
		<AppWrapper>
			<Routes>
				<Route path="/" element={<AuthenticatedRoute />}>
					{getRoutesForHome(loginInfo?.role)}
				</Route>
				<Route path="/auth" element={<NonAuthenticatedRoute />}>
					<Route path="login" element={<Login />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</AppWrapper>
	);
}

function AppWrapper(props) {
	return (
		<div className="App py-4 text-secondary bg-primary-cust">
			{props.children}
		</div>
	);
}

export default App;

import "./App.css";
import { Login } from "./pages";
import { getRoutesForHome } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import {
	AuthenticatedRoute,
	NonAuthenticatedRoute,
} from "./components/Authentication";

function App() {
	return (
		<AuthContextProvider>
			<AppWrapper>
				<Routes>
					<Route path="/" element={<AuthenticatedRoute />}>
						{getRoutesForHome()}
					</Route>
					<Route path="/auth" element={<NonAuthenticatedRoute />}>
						<Route path="login" element={<Login />} />
					</Route>
				</Routes>
			</AppWrapper>
		</AuthContextProvider>
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

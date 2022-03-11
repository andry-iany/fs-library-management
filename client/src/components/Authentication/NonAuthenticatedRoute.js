import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function NonAuthenticatedRoute() {
	const { isLoggedIn } = useContext(AuthContext);

	if (isLoggedIn) return <Navigate to="/" />;
	else return <Outlet />;
}

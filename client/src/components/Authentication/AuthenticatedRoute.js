import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthenticatedRoute() {
	const { isLoggedIn } = useContext(AuthContext);

	if (isLoggedIn) return <Outlet />;
	else return <Navigate to="/auth/login" />;
}

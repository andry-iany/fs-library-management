import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthenticatedRoute() {
	const { loginInfo } = useContext(AuthContext);

	if (loginInfo) return <Outlet />;
	else return <Navigate to="/auth/login" />;
}

import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function NonAuthenticatedRoute() {
	const { loginInfo } = useContext(AuthContext);

	if (loginInfo) return <Navigate to="/" />;
	else return <Outlet />;
}

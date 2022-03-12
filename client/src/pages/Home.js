import { Container, Row, Col } from "react-bootstrap";
import { Header, Aside } from "../components";
import { ShadowedBox } from "../components/shared";
import { Navigate, Outlet, Route } from "react-router-dom";
import RentalDetail from "../components/Main/RentalDetail";
import UsersDetail from "../components/Main/UsersDetail";
import {
	FormRentalReturn,
	FormRentalRent,
	FormAddUser,
} from "../components/Main/Form";

export default function Home() {
	return (
		<Container className="d-flex flex-column h-100">
			<ShadowedBox className="mb-5">
				<Header />
			</ShadowedBox>

			<Row className="h-100 gap-3">
				<Col md="4">
					<ShadowedBox className="h-100">
						<Aside />
					</ShadowedBox>
				</Col>

				<Col>
					<ShadowedBox className="h-100">
						<Outlet />
					</ShadowedBox>
				</Col>
			</Row>
		</Container>
	);
}

export function getRoutesForHome(role) {
	if (role === "librarian") return getRoutesForHomeAsLibrarian();
	if (role === "manager") return getRoutesForHomeAsManager();
}

function getRoutesForHomeAsLibrarian() {
	return (
		<Route path="/" element={<Home />}>
			<Route index element={<Navigate to="/rental/" />} />
			<Route path="rental/" element={<RentalDetail />} />
			<Route path="rental/rent" element={<FormRentalRent />} />
			<Route path="rental/return" element={<FormRentalReturn />} />
			<Route path="users/" element={<UsersDetail />} />
			<Route path="users/register" element={<FormAddUser />} />
		</Route>
	);
}

function getRoutesForHomeAsManager() {
	return (
		<Route path="/" element={<Home />}>
			<Route index element={<Navigate to="/admin/" />} />
			<Route path="admin/" element={<h1>You are logged as a manager</h1>} />
		</Route>
	);
}

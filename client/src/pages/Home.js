import { Container, Row, Col } from "react-bootstrap";
import { Header, Aside } from "../components";
import { ShadowedBox } from "../components/shared";
import { Navigate, Outlet, Route } from "react-router-dom";
import RentalDetail from "../components/Main/RentalDetail";
import {
	FormRentalReturn,
	FormRentalRent,
	FormAddUser,
} from "../components/Main/Form";

function Home() {
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

function getRoutesForHome() {
	return (
		<Route path="/" element={<Home />}>
			<Route index element={<Navigate to="/rental/" />} />
			<Route path="/rental/" element={<RentalDetail />} />
			<Route path="/rental/rent" element={<FormRentalRent />} />
			<Route path="/rental/return" element={<FormRentalReturn />} />
			<Route path="/users/register" element={<FormAddUser />} />
		</Route>
	);
}

export default Home;

export { getRoutesForHome };

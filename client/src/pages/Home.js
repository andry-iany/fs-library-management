import { Container, Row, Col } from "react-bootstrap";
import { Header, Aside } from "../components";
import { ShadowedBox } from "../components/shared";
import { Outlet } from "react-router-dom";

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

export default Home;

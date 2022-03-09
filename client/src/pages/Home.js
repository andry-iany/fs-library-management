import { Header, Aside, Main } from "../components";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
	return (
		<Container className="d-flex flex-column h-100">
			<Header />
			<Row className="h-100 gap-3">
				<Col md="4">
					<Aside />
				</Col>
				<Col>
					<Main />
				</Col>
			</Row>
		</Container>
	);
}

export default Home;

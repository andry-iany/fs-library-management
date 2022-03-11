import ShadowedBox from "../shared/ShadowedBox";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
	return (
		<ShadowedBox className="mb-5">
			<Navbar className="d-flex justify-content-between align-items-end  p-0">
				<Navbar.Brand>
					<span className="h1 text-secondary">Biblio</span>
					<span className="h1 text-primary-cust">Tech</span>
				</Navbar.Brand>
				<Nav className="text-primary-cust">
					<NavDropdown title="Option" className="h5" align="end">
						<NavDropdown.Item href="#action/3.1">
							Se déconnecter
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		</ShadowedBox>
	);
}

export default Header;

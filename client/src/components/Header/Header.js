import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { authInfo } from "../../utils";

export default function Header() {
	return (
		<Navbar className="d-flex justify-content-between align-items-end  p-0">
			<Navbar.Brand>
				<span className="h1 text-secondary">Biblio</span>
				<span className="h1 text-primary-cust">Tech</span>
			</Navbar.Brand>
			<Nav className="text-primary-cust">
				<NavDropdown title="Option" className="h5" align="end">
					<NavDropdown.Item onClick={handleLogout}>
						Se déconnecter
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		</Navbar>
	);
}

function handleLogout(e) {
	authInfo.clearLoginInfo();
	window.location.reload();
}

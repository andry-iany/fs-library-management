import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

export default function Aside() {
	const { loginInfo } = useContext(AuthContext);
	return getAsideByRole(loginInfo?.role);
}

function getAsideByRole(role) {
	if (role === "manager") return getAsideAsManager();
	if (role === "librarian") return getAsideAsLibrarian();
}

function getAsideAsManager() {
	return (
		<ListGroup>
			<ListItemAction to="/admin/">Liste des responsables</ListItemAction>
			<ListItemAction to="/admin/register">
				Ajouter un responsable
			</ListItemAction>
		</ListGroup>
	);
}

function getAsideAsLibrarian() {
	return (
		<ListGroup>
			<ListItemAction to="/rental/">Details des emprunts</ListItemAction>
			<ListItemAction to="/rental/rent">Emprunter un livre</ListItemAction>
			<ListItemAction to="/rental/return">Retourner un livre</ListItemAction>
			<ListItemAction to="/users/">Liste des membres</ListItemAction>
			<ListItemAction to="/users/register">Ajouter un membre</ListItemAction>
			<ListItemAction to="/books/">Liste des livres</ListItemAction>
			<ListItemAction to="/books/add">Ajouter un livre</ListItemAction>
		</ListGroup>
	);
}

function ListItemAction(props) {
	return (
		<NavLink {...getListItemActionProps(props)}>
			<ListGroup.Item
				action
				className="one-line-text border-0"
				style={{ backgroundColor: "inherit", color: "inherit" }}
			>
				{props.children}
			</ListGroup.Item>
		</NavLink>
	);
}

function getListItemActionProps(props) {
	return {
		...props,
		className: (navData) => {
			return `text-decoration-none aside-navlink
      ${navData.isActive ? "bg-primary-cust text-white" : "text-secondary"} 
      ${props.className || ""}`;
		},
	};
}

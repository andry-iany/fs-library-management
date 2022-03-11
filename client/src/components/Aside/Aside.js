import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Aside() {
	return (
		<ListGroup>
			<ListItemAction to="/rental/">Details des emprunts</ListItemAction>
			<ListItemAction to="/users/">Liste des membres</ListItemAction>
			<ListItemAction to="/users/register">Ajouter un membre</ListItemAction>
			<ListItemAction to="/rental/rent">Emprunter un livre</ListItemAction>
			<ListItemAction to="/rental/return">Retourner un livre</ListItemAction>
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

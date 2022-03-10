import ShadowedBox from "../shared/ShadowedBox";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Aside() {
	return (
		<ShadowedBox className="h-100">
			<ListGroup variant="flush">
				<ListItemAction to="/users/register">Ajouter un membre</ListItemAction>
				<ListItemAction to="/rental/">Details des emprunts</ListItemAction>
				<ListItemAction to="/rental/rent">Emprunter un livre</ListItemAction>
				<ListItemAction to="/rental/return">Retourner un livre</ListItemAction>
			</ListGroup>
		</ShadowedBox>
	);
}

function ListItemAction(props) {
	return (
		<NavLink {...getListItemActionProps(props)}>
			<ListGroup.Item
				action
				className="one-line-text"
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
			return `text-decoration-none 
      ${navData.isActive ? "bg-primary text-white" : "text-secondary"} 
      ${props.className || ""}`;
		},
	};
}

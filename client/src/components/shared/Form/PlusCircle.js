import { Image } from "react-bootstrap";
import Plus from "../../../assets/plus.svg";
import "./PlusCircle.css";

export default function PlusCircle(props) {
	return (
		<span {...buildProps(props)}>
			<Image src={Plus} className="h-100 w-100" />
		</span>
	);
}

function buildProps(props) {
	return {
		...props,
		className: `plus-circle ${props?.className || ""}`,
	};
}

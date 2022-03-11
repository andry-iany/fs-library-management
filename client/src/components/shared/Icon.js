import { Image } from "react-bootstrap";
import "./Icon.css";

export default function Icon(props) {
	return (
		<button type="button" {...buildProps(props)}>
			<Image src={props.src} className="h-100 w-100" />
		</button>
	);
}

function buildProps(props) {
	return {
		...props,
		className: `icon-circle ${props?.className || ""}`,
	};
}

import ShadowedBox from "./ShadowedBox";

export default function ShadowedBoxCentered(props) {
	return (
		<div className="h-100 d-flex justify-content-center align-items-center">
			<ShadowedBox {...buildProps(props)}>{props.children}</ShadowedBox>
		</div>
	);
}

function buildProps(props) {
	return {
		style: {
			minWidth: "350px",
			maxWidth: "400px",
		},
		...props, // we can override the above style if needed
	};
}

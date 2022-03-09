export default function ShadowedBox(props) {
	return <div {...buildProps(props)}>{props.children}</div>;
}

function buildProps(props) {
	return {
		...props,
		className: `shadow ${props?.className || ""} px-3 py-4 mb-4 bg-white`,
	};
}

import { Alert as BootstrapAlert } from "react-bootstrap";

export default function Alert({ show, variant, text, closeAlert }) {
	return (
		<BootstrapAlert
			variant={variant || "success"}
			show={show}
			onClose={closeAlert}
			dismissible
		>
			<BootstrapAlert.Heading>
				{getAlertHeading(variant)}
			</BootstrapAlert.Heading>
			<p className="mb-0">{text}</p>
		</BootstrapAlert>
	);
}

function getAlertHeading(variant) {
	if (variant === "danger") return "ERREUR";
	else return "SUCCES";
}

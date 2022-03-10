import FormRental from "./FormRental";
import { useState } from "react";

export default function FormRentalReturn() {
	const [showAlert, setShowAlert] = useState(true);

	const alertProps = {
		text: "Une erreur ou peut etre pas.",
		variant: "danger",
		show: showAlert,
		closeAlert: () => setShowAlert(false),
	};

	return (
		<FormRental
			title="Retourner un livre"
			handleSubmit={handleSubmit}
			alertProps={alertProps}
		/>
	);
}

function handleSubmit(e) {
	e.preventDefault();
	alert("renting something");
}

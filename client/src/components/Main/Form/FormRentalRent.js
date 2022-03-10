import FormRental from "./FormRental";
import { useState } from "react";

export default function FormRentalRent() {
	const [showAlert, setShowAlert] = useState(true);

	const alertProps = {
		text: "Reussite peut etre",
		show: showAlert,
		closeAlert: () => setShowAlert(false),
	};

	return (
		<FormRental
			title="Emprunter un livre"
			handleSubmit={handleSubmit}
			alertProps={alertProps}
		/>
	);
}

function handleSubmit(e) {
	e.preventDefault();
	alert("Returning something");
}

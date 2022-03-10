import FormRental from "./FormRental";

export default function FormRentalRent() {
	return <FormRental title="Emprunter un livre" handleSubmit={handleSubmit} />;
}

function handleSubmit(e) {
	e.preventDefault();
	alert("Returning something");
}

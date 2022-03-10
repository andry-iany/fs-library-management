import FormRental from "./FormRental";

export default function FormRentalReturn() {
	return <FormRental title="Retourner un livre" handleSubmit={handleSubmit} />;
}

function handleSubmit(e) {
	e.preventDefault();
	alert("renting something");
}

import ShadowedBox from "../shared/ShadowedBox";
import { FormRental } from "../shared/Form";

export default function Main() {
	return (
		<ShadowedBox className="h-100">
			<FormRental title="Emprunter un livre" handleSubmit={handleSubmit} />
		</ShadowedBox>
	);
}

function handleSubmit(e) {
	e.preventDefault();
	alert("submitting something");
}

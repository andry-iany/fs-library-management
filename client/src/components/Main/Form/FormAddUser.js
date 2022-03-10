import { SectionTitle } from "../../shared";
import { Button, Form } from "react-bootstrap";

export default function FormAddUser() {
	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Ajouter un membre" />
			<Form.Group controlId="nom" className="mb-3">
				<Form.Label>Nom du nouveau membre:</Form.Label>
				<Form.Control
					required
					name="nom"
					placeholder="Veuillez saisir le nom"
				/>
			</Form.Group>

			<Form.Group controlId="naissance" className="mb-3">
				<Form.Label>Date de naissance:</Form.Label>
				<Form.Control type="date" required name="naissance" />
			</Form.Group>

			<Form.Group controlId="CIN" className="mb-3">
				<Form.Label>Carte d'identité nationale du membre ou tuteur:</Form.Label>
				<Form.Control
					required
					name="CIN"
					placeholder="Veuillez saisir la CIN"
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Adresse:</Form.Label>
				<Form.Control
					className="mb-2"
					required
					name="logement"
					placeholder="Logement (eg: IAD 90A)"
				/>
				<Form.Control
					className="mb-2"
					required
					name="commune"
					placeholder="Commune"
				/>
				<Form.Control
					className="mb-2"
					required
					name="ville"
					placeholder="Ville"
				/>
			</Form.Group>

			<div className="mt-4 d-flex justify-content-center">
				<Button type="submit">Soumettre</Button>
			</div>
		</Form>
	);
}

function handleSubmit(e) {
	e.preventDefault();
	alert("we are adding new user.");
}

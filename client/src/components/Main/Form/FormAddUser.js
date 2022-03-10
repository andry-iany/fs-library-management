import { SectionTitle } from "../../shared";
import { Button, Form } from "react-bootstrap";
import Alert from "../Alert";
import { useState } from "react";
import { usePost } from "../../../hooks/HTTPHooks";

export default function FormAddUser() {
	const [showAlert, setShowAlert] = useState(false);
	const { makeRequest, data, isPending, error } = usePost();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = getFormData(e.target);
		await makeRequest("/users/register", formData);
		setShowAlert(() => true);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Ajouter un membre" />

			<Alert
				variant={data ? "success" : "danger"}
				text={data ? "Membre créer avec succès." : error}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			{getFormGroups()}

			<div className="mt-4 d-flex justify-content-center">
				<Button type="submit" className="btn-primary-cust" disabled={isPending}>
					{isPending ? "Patientez..." : "Soumettre"}
				</Button>
			</div>
		</Form>
	);
}

function getFormData(form) {
	return {
		nom: form.nom.value,
		dateDeNaissance: form.naissance.value,
		CIN: form.CIN.value,
		adresse: {
			logement: form.logement.value,
			commune: form.commune.value,
			ville: form.ville.value,
		},
	};
}

function getFormGroups() {
	const groups = [
		{
			label: "Nom du nouveau membre:",
			formControls: [
				{
					name: "nom",
					placeholder: "Veuillez saisir le nom",
				},
			],
		},
		{
			label: "Date de naissance:",
			formControls: [
				{
					name: "naissance",
					placeholder: "Date de naissance",
					type: "date",
				},
			],
		},
		{
			label: "Carte d'identité du membre ou celui du tuteur:",
			formControls: [
				{
					name: "CIN",
					placeholder: "Veuillez saisir la CIN",
				},
			],
		},
		{
			label: "Adresse:",
			formControls: [
				{ name: "logement", placeholder: "Logement (eg: IAD 90A)" },
				{ name: "commune", placeholder: "Commune" },
				{ name: "ville", placeholder: "Ville" },
			],
		},
	];

	return groups.map((group) => {
		return (
			<Form.Group className="mb-3" key={group.label}>
				<Form.Label>{group.label}</Form.Label>
				{group.formControls.map((fc) => getFormControl(fc))}
			</Form.Group>
		);
	});
}

function getFormControl({ name, placeholder, type }) {
	return (
		<Form.Control
			className="mb-2"
			required
			name={name}
			placeholder={placeholder}
			key={name}
			type={type || "text"}
		/>
	);
}

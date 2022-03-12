import { SectionTitle, Alert } from "../../shared";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePost } from "../../../hooks/HTTPHooks";
import { getFormGroups, clearAllFormInputs } from "../../shared/formUtils";

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

export default function FormEditUser() {
	const [showAlert, setShowAlert] = useState(false);
	const { makeRequest, data, isPending, error } = usePost();
	const [alertTimeout, setAlertTimeout] = useState(null);

	useEffect(() => {
		if (data) clearAllFormInputs();
	}, [data]);

	useEffect(() => {
		return () => clearTimeout(alertTimeout);
	});

	const hideAlertAfterTimeout = () => {
		const timeout = setTimeout(() => {
			setShowAlert(() => false);
			setAlertTimeout(() => null);
		}, 5000);
		setAlertTimeout(timeout);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = getFormData(e.target);
		await makeRequest("/users/register", formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Ajouter un membre" />

			<Alert
				variant={data ? "success" : "danger"}
				text={data ? "Membre créé avec succès." : error}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			{getFormGroups(groups)}

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

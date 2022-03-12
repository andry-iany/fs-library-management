import { SectionTitle, Alert } from "../../shared";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePost } from "../../../hooks/HTTPHooks";
import { getFormGroups, clearAllFormInputs } from "../../shared/formUtils";

const groups = [
	{
		label: "ISBN:",
		formControls: [
			{
				name: "ISBN",
				placeholder: "Veuillez saisir l'ISBN du livre",
			},
		],
	},
	{
		label: "Nom:",
		formControls: [
			{
				name: "nom",
				placeholder: "Nom du livre",
			},
		],
	},
];

export default function FormAddBook() {
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
		await makeRequest("/books/add", formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Ajouter un livre" />

			<Alert
				variant={data ? "success" : "danger"}
				text={data ? "Livre ajouté avec succès." : error}
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
		ISBN: form.ISBN.value,
	};
}

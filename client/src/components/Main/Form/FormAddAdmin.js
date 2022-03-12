import { SectionTitle, Alert } from "../../shared";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePost } from "../../../hooks/HTTPHooks";
import { getFormGroups, clearAllFormInputs } from "../../shared/formUtils";

const groups = [
	{
		label: "Nom du responsable:",
		formControls: [
			{
				name: "nom",
				placeholder: "Veuillez saisir le nom",
			},
		],
	},
	{
		label: "Email:",
		formControls: [
			{
				name: "email",
				placeholder: "Email du membre",
				type: "email",
			},
		],
	},
	{
		label: "Mot de passe:",
		formControls: [
			{
				name: "password",
				placeholder: "Mot de passe",
				type: "password",
			},
		],
	},
];

export default function FormAddAdmin() {
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
		await makeRequest("/admin/register", formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Ajouter un responsable" />

			<Alert
				variant={data ? "success" : "danger"}
				text={data ? "Responsable créé avec succès." : error}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			{getFormGroups(groups)}

			<Form.Group>
				<Form.Label>Role:</Form.Label>
				<Form.Select name="role">
					<option value="librarian">Bibliothécaire</option>
					<option value="manager">Manager</option>
				</Form.Select>
			</Form.Group>

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
		role: form.role.value,
		email: form.email.value,
		password: form.password.value,
	};
}

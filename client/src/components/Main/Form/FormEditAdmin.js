import { SectionTitle, Alert } from "../../shared";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePost, useGet } from "../../../hooks/HTTPHooks";
import { getFormGroups, clearAllFormInputs } from "../../shared/formUtils";
import { useParams } from "react-router-dom";

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
];

export default function FormEditAdmin() {
	const [showAlert, setShowAlert] = useState(false);
	const [alertTimeout, setAlertTimeout] = useState(null);
	const { makeRequest, data, isPending, error } = usePost();
	const {
		makeRequest: makeInitialRequest,
		data: initialData,
		isPending: isPendingInitialRequest,
		error: initialError,
	} = useGet();

	const { adminId } = useParams();
	useEffect(() => {
		console.log(adminId);
		makeInitialRequest(`/admin/${adminId}`);
	}, []);

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
			<SectionTitle text="Modifier un responsable" />

			<Alert
				variant={data ? "success" : "danger"}
				text={data ? "Responsable créé avec succès." : error}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			<Form.Group className="mb-2">
				<Form.Label>ID du membre:</Form.Label>
				<Form.Control readOnly value={adminId} />
			</Form.Group>

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
	const data = {
		nom: form.nom.value,
		role: form.role.value,
		email: form.email.value,
		password: form.password.value,
	};
	return data;
}

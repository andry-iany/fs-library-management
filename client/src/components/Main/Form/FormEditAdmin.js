import { SectionTitle, Alert } from "../../shared";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { usePut, useGet, useDelete } from "../../../hooks/HTTPHooks";
import { getFormGroups } from "../../shared/formUtils";
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

	const putData = usePut();
	const initialData = useGet();
	const deleteData = useDelete();

	const { adminId } = useParams();

	useEffect(() => {
		initialData.makeRequest(`/admin/detail/${adminId}`);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (initialData.data) {
			const form = document.querySelector("form");
			const content = initialData.data.data.data;
			form.nom.value = content.nom;
			form.email.value = content.email;
			form.role.value = content.role;
		}
	}, [initialData.data]);

	useEffect(() => {
		if (deleteData.data) {
			alert(`Le responsable ayant ID: ${adminId} est supprimé avec succès.`);
			window.location.reload();
		}
		// eslint-disable-next-line
	}, [deleteData.data]);

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
		await putData.makeRequest(`/admin/edit/${adminId}`, formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	const handleSuppress = async (e) => {
		deleteData.makeRequest(`/admin/delete/${adminId}`);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text="Modifier ou Supprimer un responsable" />

			<Alert
				variant={(() => {
					if (deleteData.error || putData.error || initialData.error)
						return "danger";
					return "success";
				})()}
				text={(() => {
					if (initialData.error)
						return `Requete pour donnée initiale échouéé: ${initialData.error}`;
					return putData.data
						? "Responsable modifié avec succès."
						: putData.error;
				})()}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			<Form.Group className="mb-2">
				<Form.Label>ID du responsable:</Form.Label>
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

			<div className="mt-4 d-flex justify-content-center gap-3">
				<Button
					type="submit"
					className="btn-primary-cust"
					disabled={putData.isPending || deleteData.isPending}
				>
					{putData.isPending ? "Patientez..." : "Modifier"}
				</Button>
				<Button
					type="button"
					className="btn-danger"
					disabled={putData.isPending || deleteData.isPending}
					onClick={handleSuppress}
				>
					Supprimer
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
	};
}

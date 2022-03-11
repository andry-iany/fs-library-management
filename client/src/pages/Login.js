import { useEffect, useState } from "react";
import { getFormGroups } from "../components/shared/formUtils";
import { Alert, SectionTitle, ShadowedBoxCentered } from "../components/shared";
import { Form, Button } from "react-bootstrap";
import { usePost } from "../hooks/HTTPHooks";
import { useNavigate } from "react-router-dom";

const groups = [
	{
		label: "Email:",
		formControls: [
			{
				name: "email",
				placeholder: "eg. example@example.com",
				type: "email",
			},
		],
	},
	{
		label: "Password:",
		formControls: [
			{
				name: "password",
				placeholder: "Your password",
				type: "password",
			},
		],
	},
];

export default function Login() {
	const { data, error, isPending, makeRequest } = usePost();
	const [showAlert, setShowAlert] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		let alertTimeout = null;

		if (error) {
			setShowAlert(() => true);
			alertTimeout = setTimeout(() => setShowAlert(() => false), 5000);
		} else if (data) {
			navigate("/");
		}

		return () => clearTimeout(alertTimeout);
		// eslint-disable-next-line
	}, [data, error]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = getFormData(e.target);
		await makeRequest("/auth/login", formData);
	};

	return (
		<ShadowedBoxCentered>
			<SectionTitle text="Se connecter" />

			<Alert
				variant="danger"
				text={error}
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
			/>

			<Form onSubmit={handleSubmit}>
				{getFormGroups(groups)}

				<div className="d-flex justify-content-center mt-5">
					<Button
						type="submit"
						className="btn-primary-cust"
						disabled={isPending}
					>
						{isPending ? "Patientez..." : "Soumettre"}
					</Button>
				</div>
			</Form>
		</ShadowedBoxCentered>
	);
}

function getFormData(form) {
	return {
		name: form.name.value,
		password: form.password.value,
	};
}

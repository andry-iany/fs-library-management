import { useEffect, useState } from "react";
import { getFormGroups } from "../components/shared/formUtils";
import { Alert, SectionTitle, ShadowedBoxCentered } from "../components/shared";
import { Form, Button } from "react-bootstrap";
import { usePost } from "../hooks/HTTPHooks";
import { authInfo } from "../utils/";

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
		label: "Mot de passe:",
		formControls: [
			{
				name: "password",
				placeholder: "Votre mot de passe",
				type: "password",
			},
		],
	},
];

export default function Login() {
	const { data, error, isPending, makeRequest } = usePost();
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		let alertTimeout = null;

		if (error) {
			setShowAlert(() => true);
			alertTimeout = setTimeout(() => setShowAlert(() => false), 5000);
		} else if (data) {
			authInfo.storeLoginInfo(data.data.data);
			window.location.reload();
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
		email: form.email.value,
		password: form.password.value,
	};
}

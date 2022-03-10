import FormRental from "./FormRental";
import { useEffect, useState } from "react";
import { usePost } from "../../../hooks/HTTPHooks";

export default function FormRentalReturn() {
	const [showAlert, setShowAlert] = useState(false);
	const { makeRequest, error, data, isPending } = usePost();
	const [alertTimeout, setAlertTimeout] = useState(null);

	useEffect(() => {
		if (data) clearForm();
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

	const alertProps = {
		show: showAlert,
		closeAlert: () => setShowAlert(false),
		variant: data ? "success" : "danger",
		text: data ? "Opération réussie." : error,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = getFormData(e.target);
		await makeRequest("/rental/return", formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	return (
		<FormRental
			title="Retourner un livre"
			handleSubmit={handleSubmit}
			alertProps={alertProps}
			isPending={isPending}
		/>
	);
}

function clearForm() {
	const form = document.querySelector("form");
	form.userId.value = "";
	Array.from(form.querySelectorAll(".ISBNInput input")).forEach(
		(input) => (input.value = "")
	);
}

function getFormData(form) {
	const ISBNs = Array.from(form.querySelectorAll(".ISBNInput input"))
		.map((input) => input.value)
		.filter((value) => value.trim() !== "");

	return {
		userId: form.userId.value,
		ISBN: ISBNs,
	};
}

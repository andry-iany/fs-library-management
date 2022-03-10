import FormRental from "./FormRental";
import { useEffect, useState } from "react";
import { usePost } from "../../../hooks/HTTPHooks";

export default function FormRentalRent() {
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
		text: data ? "Emprunt réussi." : error,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = getFormData(e.target);
		await makeRequest("/rental/rent", formData);
		setShowAlert(() => true);
		hideAlertAfterTimeout();
	};

	return (
		<FormRental
			title="Emprunter un livre"
			handleSubmit={handleSubmit}
			alertProps={alertProps}
			isPending={isPending}
		/>
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

function clearForm() {
	const form = document.querySelector("form");
	form.userId.value = "";
	Array.from(form.querySelectorAll(".ISBNInput input")).forEach(
		(input) => (input.value = "")
	);
}

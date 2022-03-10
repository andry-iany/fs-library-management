import { Form, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import Alert from "../Alert";
import PlusCircle from "./PlusCircle";
import { SectionTitle } from "../../shared";
import "./FormRental.css";

export default function FormRental({
	title,
	handleSubmit,
	alertProps,
	isPending,
}) {
	const ISBNGroup = useRef();

	useEffect(() => {
		ISBNGroup.current.addEventListener("click", (e) => {
			if (isISBNClose(e.target)) {
				handleCloseISBNInput(e.target);
			}
		});
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<SectionTitle text={title} />
			<Alert {...alertProps} />

			{getFormForMemberID()}

			{getFormForISBNGroup(ISBNGroup)}

			<div className="mt-3 mb-4">
				<PlusCircle onClick={handleAddISBNInput} className="mx-auto" />
			</div>

			<div className="d-flex justify-content-center">
				<Button type="submit" className="btn-primary-cust">
					{isPending ? "Patientez..." : "Soumettre"}
				</Button>
			</div>
		</Form>
	);
}

function isISBNClose(element) {
	return element.classList.contains("ISBNClose");
}

function handleCloseISBNInput(target) {
	if (thereAreMoreThanOneISBNInputs()) {
		target.parentElement.remove();
	}
}

function thereAreMoreThanOneISBNInputs() {
	const allISBNInputs = document.querySelectorAll(".ISBNInput");
	return allISBNInputs.length > 1;
}

function getFormForMemberID() {
	return (
		<Form.Group controlId="userId" className="mb-3">
			<Form.Label>ID du membre:</Form.Label>
			<Form.Control
				required
				name="userId"
				placeholder="Veuillez saisir l'identifiant du membre"
			/>
		</Form.Group>
	);
}

function getFormForISBNGroup(ISBNGroupRef) {
	return (
		<Form.Group ref={ISBNGroupRef} className="ISBNGroup">
			<Form.Label>ISBN du livre:</Form.Label>
			<Form.Group className="ISBNInput mb-2">
				<Form.Control required placeholder="Veuillez saisir l'ISBN du livre" />
				<span className="ISBNClose"></span>
			</Form.Group>
		</Form.Group>
	);
}

function handleAddISBNInput() {
	const ISBNGroup = document.querySelector(".ISBNGroup");
	const clonedInput = ISBNGroup.querySelector(".ISBNInput").cloneNode(true);
	ISBNGroup.appendChild(clonedInput);
	clonedInput.querySelector("input").value = "";
}

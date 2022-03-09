import FormTitle from "./FormTitle";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import PlusCircle from "./PlusCircle";
import "./Form.css";
import { useEffect, useRef } from "react";

export default function Form() {
	const ISBNGroup = useRef();

	useEffect(() => {
		ISBNGroup.current.addEventListener("click", (e) => {
			if (isISBNClose(e.target)) {
				handleCloseISBNInput(e.target);
			}
		});
	}, []);

	return (
		<BootstrapForm className="position-relative">
			<FormTitle text="Emprunter un livre" />

			<BootstrapForm.Group controlId="userId" className="mb-3">
				<BootstrapForm.Label>ID du membre:</BootstrapForm.Label>
				<BootstrapForm.Control
					required
					name="userId"
					placeholder="Veuillez saisir l'identifiant du membre"
				/>
			</BootstrapForm.Group>

			<BootstrapForm.Group ref={ISBNGroup} className="ISBNGroup">
				<BootstrapForm.Label>ISBN du livre:</BootstrapForm.Label>
				<BootstrapForm.Group className="ISBNInput mb-2">
					<BootstrapForm.Control
						required
						placeholder="Veuillez saisir l'ISBN du livre"
					/>
					<span className="ISBNClose"></span>
				</BootstrapForm.Group>
			</BootstrapForm.Group>

			<div className="mt-3 mb-4">
				<PlusCircle onClick={handleAddISBNInput} className="mx-auto" />
			</div>

			<div className="d-flex justify-content-center">
				<Button type="submit">Soumettre</Button>
			</div>
		</BootstrapForm>
	);
}

function isISBNClose(element) {
	return element.classList.contains("ISBNClose");
}

function handleAddISBNInput() {
	const ISBNGroup = document.querySelector(".ISBNGroup");
	const clonedInput = ISBNGroup.querySelector(".ISBNInput").cloneNode(true);
	ISBNGroup.appendChild(clonedInput);
	clonedInput.querySelector("input").value = "";
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

import { Form } from "react-bootstrap";

/**
 * it operates on data like
 * ```js
 * {
      label: "...",
      formControls: [
        {
          name: "...",
          placeholder: "...",
          type: "...",
        },
      ],
 * },
 * ```
 * @param {*} groups 
 * @returns 
 */
export function getFormGroups(groups) {
	return groups.map((group) => {
		return (
			<Form.Group className="mb-3" key={group.label}>
				<Form.Label>{group.label}</Form.Label>
				{group.formControls.map((fc) => getFormControl(fc))}
			</Form.Group>
		);
	});
}

export function getFormControl({ name, placeholder, type }) {
	return (
		<Form.Control
			className="mb-2"
			required
			name={name}
			placeholder={placeholder}
			key={name}
			type={type || "text"}
		/>
	);
}

export function clearAllFormInputs(form = document) {
	Array.from(form.querySelectorAll("input")).forEach(
		(input) => (input.value = "")
	);
}

import axios from "axios";
import { useState } from "react";

const apiRoot = "http://localhost:8080";

function usePost() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const makeRequest = async (path, body) => {
		setIsPending(() => true);
		try {
			const result = await axios.post(apiRoot + path, body);
			setIsPending(() => false);
			setError(() => null);
			setData(() => result);
		} catch (err) {
			setIsPending(() => false);
			setData(() => null);
			setError(() => err?.response.data.error || "Une erreur est survenue.");
		}
	};

	return { data, error, isPending, makeRequest };
}

export { usePost };

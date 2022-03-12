import axios from "axios";
import { useState } from "react";

const apiRoot = "http://localhost:8080";

function usePost() {
	const result = useMakeHttpRequest("post");
	return result;
}

function useGet() {
	const result = useMakeHttpRequest("get");
	return result;
}

function useMakeHttpRequest(method = "get") {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const makeRequest = async (path, ...rest) => {
		setIsPending(() => true);
		setError(() => null);
		try {
			const axiosInstance = getAxiosInstanceWithAuth();
			const result = await axiosInstance[method](apiRoot + path, ...rest);
			setIsPending(() => false);
			setError(() => null);
			setData(() => result);
		} catch (err) {
			console.log(err);
			setIsPending(() => false);
			setData(() => null);
			setError(() => err?.response?.data?.error || "Une erreur est survenue.");
		}
	};

	return { data, error, isPending, makeRequest };
}

function getAxiosInstanceWithAuth() {
	const authToken = localStorage.getItem("authToken");
	return axios.create({
		headers: {
			Authorization: authToken ? `Bearer ${authToken}` : "",
		},
	});
}

export { useGet, usePost };

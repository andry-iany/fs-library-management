import axios from "axios";
import { useState } from "react";
import { authInfo } from "../utils";

const apiRoot = "http://localhost:8080";

function usePost() {
	const result = useMakeHttpRequest("post");
	return result;
}

function usePut() {
	const result = useMakeHttpRequest("put");
	return result;
}

function useGet() {
	const result = useMakeHttpRequest("get");
	return result;
}

function useDelete() {
	const result = useMakeHttpRequest("delete");
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
			if (err?.response?.status === 401) {
				// we want to be redirected to login page when 401
				authInfo.clearLoginInfo();
				window.location.reload();
			} else {
				setIsPending(() => false);
				setData(() => null);
				setError(
					() => err?.response?.data?.error || "Une erreur est survenue."
				);
			}
		}
	};

	return { data, error, isPending, makeRequest };
}

function getAxiosInstanceWithAuth() {
	const loginInfo = authInfo.getLoginInfo();
	return axios.create({
		headers: {
			Authorization: loginInfo?.token ? `Bearer ${loginInfo?.token}` : "",
		},
	});
}

export { useGet, usePost, usePut, useDelete };

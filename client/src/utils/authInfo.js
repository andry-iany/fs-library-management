export function storeLoginInfo({ token, role }) {
	localStorage.setItem("lib_auth", JSON.stringify({ token, role }));
}

export function getLoginInfo() {
	return JSON.parse(localStorage.getItem("lib_auth"));
}

export function clearLoginInfo() {
	localStorage.removeItem("lib_auth");
}

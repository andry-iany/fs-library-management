import { useEffect, useState, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("lib_authToken");
		setIsLoggedIn(() => token || false);
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

export { AuthContextProvider };

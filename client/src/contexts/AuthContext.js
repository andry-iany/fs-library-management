import { useState, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [isLoggedIn] = useState(false);

	return (
		<AuthContext.Provider value={{ isLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

export { AuthContextProvider };

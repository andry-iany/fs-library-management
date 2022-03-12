import { useEffect, useState, createContext } from "react";
import { authInfo } from "../utils";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loginInfo, setLoginInfo] = useState(null);

	useEffect(() => {
		setLoginInfo(() => authInfo.getLoginInfo());
	}, []);

	return (
		<AuthContext.Provider value={{ loginInfo }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

export { AuthContextProvider };

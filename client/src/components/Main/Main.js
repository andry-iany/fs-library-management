import { ShadowedBox } from "../shared";
import { FormAddUser, FormRentalRent, FormRentalReturn } from "./Form";
import { Routes, Route } from "react-router-dom";
import RentalDetail from "./RentalDetail";

export default function Main() {
	return (
		<ShadowedBox className="h-100 position-relative">
			<Routes>
				<Route path="/rental" element={<RentalDetail />} />
				<Route path="/rental/rent" element={<FormRentalRent />} />
				<Route path="/rental/return" element={<FormRentalReturn />} />
				<Route path="/users/register" element={<FormAddUser />} />
			</Routes>
		</ShadowedBox>
	);
}

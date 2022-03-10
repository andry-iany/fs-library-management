import ShadowedBox from "../shared/ShadowedBox";

function Header() {
	return (
		<ShadowedBox className="h1 mb-5">
			<span>Biblio</span>
			<span className="text-primary-cust">Tech</span>
		</ShadowedBox>
	);
}

export default Header;

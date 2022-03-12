import { SectionTitle, PaginationControl } from "../shared";
import { Table } from "react-bootstrap";
import { useGet } from "../../hooks/HTTPHooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ROW_LIMIT = 6;
const endpoint = "/admin";

export default function AdminsDetail() {
	const { data, error, isPending, makeRequest } = useGet();

	useEffect(() => {
		makeRequest(`${endpoint}?_page=1&_limit=${ROW_LIMIT}`); // don't await for this request
		// eslint-disable-next-line
	}, []);

	const getRows = () => {
		const result = data.data.data.map((row) => getTableRow(row));
		return result;
	};

	const onClickNextOrPrev = (currentPage) => {
		makeRequest(`${endpoint}?_page=${currentPage}&_limit=${ROW_LIMIT}`);
	};

	return (
		<div>
			<SectionTitle text="Liste des responsables:" />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID du responsable</th>
						<th>Nom</th>
						<th>Role</th>
					</tr>
				</thead>

				<tbody>{data && getRows()}</tbody>
			</Table>

			{!data && isPending && <div>Chargement...</div>}

			{error && <div>{error}</div>}

			{data && (
				<PaginationControl
					onClickNextOrPrev={onClickNextOrPrev}
					maxPage={data.data.maxPage}
				/>
			)}
		</div>
	);
}

function getTableRow({ _id, nom, role }) {
	return (
		<tr key={_id}>
			<td>
				<Link to={`/admin/edit/${_id}`}>{_id}</Link>
			</td>
			<td>{nom}</td>
			<td>{role === "manager" ? "Manager" : "Bibliothécaire"}</td>
		</tr>
	);
}

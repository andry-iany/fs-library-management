import { SectionTitle, PaginationControl } from "../shared";
import { Table } from "react-bootstrap";
import { useGet } from "../../hooks/HTTPHooks";
import { useEffect } from "react";

const ROW_LIMIT = 6;

export default function UsersDetail() {
	const { data, error, isPending, makeRequest } = useGet();
	useEffect(() => {
		makeRequest(`/users?_page=1&_limit=${ROW_LIMIT}`); // don't await for this request
		// eslint-disable-next-line
	}, []);

	const getRows = () => {
		const result = data.data.data.map((row) => getTableRow(row));
		return result;
	};

	const onClickNextOrPrev = (currentPage) => {
		makeRequest(`/users?_page=${currentPage}&_limit=${ROW_LIMIT}`);
	};

	return (
		<div>
			<SectionTitle text="Liste des membres:" />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID du membre</th>
						<th>Nom</th>
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

function getTableRow({ _id, nom }) {
	return (
		<tr key={_id}>
			<td>{_id}</td>
			<td>{nom}</td>
		</tr>
	);
}

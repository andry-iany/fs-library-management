import { SectionTitle, PaginationControl } from "../shared";
import { Table } from "react-bootstrap";
import { useGet } from "../../hooks/HTTPHooks";
import { useEffect } from "react";

const ROW_LIMIT = 6;
const endpoint = "/books";

export default function BooksDetail() {
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
						<th>ISBN</th>
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

function getTableRow({ _id, ISBN, nom }) {
	return (
		<tr key={_id}>
			<td>{ISBN}</td>
			<td>{nom}</td>
		</tr>
	);
}

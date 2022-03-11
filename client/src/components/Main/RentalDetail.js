import { SectionTitle } from "../shared";
import { Table } from "react-bootstrap";
import { useGet } from "../../hooks/HTTPHooks";
import { useEffect } from "react";

export default function RentalDetail() {
	const { data, error, isPending, makeRequest } = useGet();
	useEffect(() => {
		makeRequest("/rental"); // don't wait for it
		// eslint-disable-next-line
	}, []);

	const getRows = () => {
		const result = data.data.data.map((row) => getTableRow(row));
		return result;
	};

	return (
		<div>
			<SectionTitle text="Details des emprunts:" />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID du membre</th>
						<th>Livre 1</th>
						<th>Livre 2</th>
						<th>Livre 3</th>
						<th>Date</th>
					</tr>
				</thead>

				<tbody>{data && getRows()}</tbody>
			</Table>

			{isPending && <div>Chargement...</div>}

			{error && <div>{error}</div>}
		</div>
	);
}

function getTableRow({ userId, ISBN, rentedOn }) {
	const MAX_BOOK_ALLOWED = 3;

	const getBook = (ISBN) => {
		const bookData = [];
		for (let i = 0; i < MAX_BOOK_ALLOWED; i++) {
			bookData.push(<td key={`${userId}_${i}`}>{ISBN[i] || ""}</td>);
		}
		return bookData;
	};

	return (
		<tr key={userId}>
			<td>{userId}</td>
			{getBook(ISBN)}
			<td>{new Date(rentedOn).toUTCString()}</td>
		</tr>
	);
}

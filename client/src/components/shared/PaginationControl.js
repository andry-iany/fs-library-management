import { useEffect, useState } from "react";
import Icon from "./Icon";
import Next from "../../assets/arrow-right.svg";
import Prev from "../../assets/arrow-left.svg";

export default function PaginationControl({ onClickNextOrPrev, maxPage }) {
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		onClickNextOrPrev(currentPage);
		// eslint-disable-next-line
	}, [currentPage]);

	const handleClickPrev = (e) => {
		setCurrentPage((cur) => --cur);
	};
	const handleClickNext = (e) => {
		setCurrentPage((cur) => ++cur);
	};

	return (
		<div className="d-flex justify-content-center align-items-center gap-3 my-3">
			<Icon src={Prev} disabled={currentPage === 1} onClick={handleClickPrev} />
			<span className="border-bottom-cust">{currentPage}</span>
			<Icon
				src={Next}
				disabled={currentPage === maxPage}
				onClick={handleClickNext}
			/>
		</div>
	);
}

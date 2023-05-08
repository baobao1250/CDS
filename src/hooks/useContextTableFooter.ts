import { useState } from "react";

const useContextTableFooter = () => {
	const [pageParams, setPageParams] = useState({ total: 0, page: 0, rowsPerPage: 10 });

	function handleOnChangePage(value: number) {
		setPageParams((pageParams) => ({ ...pageParams, page: value }));
	}

	function handOnChangeRowsPerPage(value: number) {
		setPageParams((pageParams) => ({ ...pageParams, page: 0, rowsPerPage: value }));
	}

	function updateTotal(value: number) {
		setPageParams((pageParams) => ({ ...pageParams, total: value }));
	}

	return { pageParams, handleOnChangePage, handOnChangeRowsPerPage, updateTotal, setPageParams };
};

export default useContextTableFooter;

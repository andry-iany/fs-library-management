function formatResponseSuccess(data) {
	return { data };
}
function formatResponseSuccessWithPagination(data, currentPage, maxPage) {
	return { data, currentPage, maxPage };
}

function formatResponseError(error) {
	return { error };
}

module.exports = {
	formatResponseError,
	formatResponseSuccess,
	formatResponseSuccessWithPagination,
};

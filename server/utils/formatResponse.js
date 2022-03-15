exports.formatResponseSuccess = function (data) {
	return { data };
};
exports.formatResponseSuccessWithPagination = function (
	data,
	currentPage,
	maxPage
) {
	return { data, currentPage, maxPage };
};

exports.formatResponseError = function (error) {
	return { error };
};

exports.forSuccess = function (data) {
	return { data };
};
exports.forSuccessWithPagination = function ({ data, currentPage, maxPage }) {
	return { data, currentPage, maxPage };
};

exports.forError = function (error) {
	return { error };
};

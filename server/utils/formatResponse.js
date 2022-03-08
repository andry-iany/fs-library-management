function formatResponseSuccess(data) {
	return { data };
}
function formatResponseError(error) {
	return { error };
}

module.exports = { formatResponseError, formatResponseSuccess };

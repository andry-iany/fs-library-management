function getPageAndLimitIfValid(query) {
	const { _limit, _page } = query;
	if (!isNaN(parseInt(_limit)) && !isNaN(parseInt(_page))) {
		return { _limit: parseInt(_limit), _page: parseInt(_page) };
	}
	return null;
}

function getMaxPage(docsCount, limit) {
	return Math.ceil(docsCount / limit);
}

module.exports = { getPageAndLimitIfValid, getMaxPage };

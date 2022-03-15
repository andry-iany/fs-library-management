const { formatResponse, paginationUtils, dbUtils } = require("../utils");

exports.handleGetWithOptionalPagination = async function (req, res) {
	let resBody;
	const pageAndLimit = paginationUtils.getPageAndLimitIfValid(req.query);

	const queryDBArgs = [
		req.queryDBArgs.Model,
		req.queryDBArgs.filter,
		pageAndLimit,
	]; // for readabity purpose, and to achieve the order imposed by dbUtils.queryDB() so the order matters in this array.

	const result = await dbUtils.queryDB(...queryDBArgs);

	resBody = pageAndLimit
		? formatResponse.forSuccessWithPagination(result)
		: formatResponse.forSuccess(result);

	res.status(200).json(resBody);
};

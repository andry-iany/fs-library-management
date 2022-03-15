const mongoose = require("mongoose");
const { getMaxPage } = require("./paginationUtils");

/**
 * @param {mongoose.Model} Model
 * @param {*} filter
 * @param {*?} pageAndLimit optional object that has properties _page and _limit
 *
 */
exports.queryDB = function (Model, filter, pageAndLimit) {
	if (someUndefined(Model, filter))
		throw new Error("Model and filter are required.");

	if (pageAndLimit) return queryDBWithPagination(Model, filter, pageAndLimit);
	else return queryDBWithoutPagination(Model, filter);
};

async function queryDBWithoutPagination(Model, filter) {
	return Model.find(filter);
}

async function queryDBWithPagination(Model, filter, { _page, _limit }) {
	if (someUndefined(_page, _limit))
		throw new Error("_page and _limit must be defined for pagination.");

	const data = await Model.find(filter)
		.skip((_page - 1) * _limit)
		.limit(_limit);

	const docsCount = await Model.countDocuments();

	return {
		data,
		currentPage: _page,
		maxPage: getMaxPage(docsCount, _limit),
	};
}

function someUndefined(...args) {
	return args.some((arg) => arg === undefined);
}

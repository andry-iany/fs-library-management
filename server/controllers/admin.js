const { formatResponse, paginationUtils } = require("../utils");
const { Admin } = require("../models");

const { getPageAndLimitIfValid, getMaxPage } = paginationUtils;
const { formatResponseSuccess, formatResponseSuccessWithPagination } =
	formatResponse;

async function getAllAdmins(req, res) {
	const pageAndLimit = getPageAndLimitIfValid(req.query);
	if (pageAndLimit) {
		await getAllAdminsPaginated(res, pageAndLimit);
	} else {
		await getAllAdminsNonPaginated(res);
	}
}

async function getAllAdminsPaginated(res, { _page, _limit }) {
	const admins = await Admin.find({})
		.skip((_page - 1) * _limit)
		.limit(_limit);

	const docsCount = await Admin.countDocuments();
	res
		.status(200)
		.json(
			formatResponseSuccessWithPagination(
				admins,
				_page,
				getMaxPage(docsCount, _limit)
			)
		);
}

async function getAllAdminsNonPaginated(res) {
	const admins = await Admin.find({});
	res.status(200).json(formatResponseSuccess(admins));
}
module.exports = { getAllAdmins };

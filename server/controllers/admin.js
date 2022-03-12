const { formatResponse, paginationUtils, ErrorResponse } = require("../utils");
const { Admin } = require("../models");
const mongoose = require("mongoose");

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

async function getAdmin(req, res, next) {
	const { adminId } = req.params;
	if (!mongoose.isValidObjectId(adminId))
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	const admin = await Admin.findById(adminId);
	if (!admin)
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	return res.status(200).json(formatResponseSuccess(admin));
}

async function deleteAdmin(req, res, next) {
	const { adminId } = req.params;
	if (!mongoose.isValidObjectId(adminId))
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	const admin = await Admin.findByIdAndDelete(adminId);
	if (!admin)
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	return res.status(200).json(formatResponseSuccess(admin));
}

async function editAdmin(req, res, next) {
	const { adminId } = req.params;

	if (!mongoose.isValidObjectId(adminId))
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	const admin = await Admin.findById(adminId);
	if (!admin)
		return next(
			new ErrorResponse("Le responsable spécifié n'existe pas.", 400)
		);

	if (req.body.nom) admin.nom = req.body.nom;
	if (req.body.email) admin.email = req.body.email;
	if (req.body.role) admin.role = req.body.role;

	try {
		const editedAdmin = await admin.save();
		return res.status(200).json(formatResponseSuccess(editedAdmin));
	} catch (err) {
		console.log(err);
		return next(err);
	}
}

async function register(req, res, next) {
	const adminExist = await Admin.findOne({ email: req.validBody.email });
	if (adminExist)
		return next(new ErrorResponse("Le responsable existe dejà.", 400));

	const admin = new Admin({
		...req.validBody,
	});

	try {
		const savedAdmin = await admin.save();
		return res.status(201).json(formatResponseSuccess(savedAdmin));
	} catch (err) {
		return next(err);
	}
}

module.exports = { getAllAdmins, register, getAdmin, deleteAdmin, editAdmin };

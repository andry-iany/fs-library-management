const { Admin } = require("../models");
const mongoose = require("mongoose");
const { handleGetWithOptionalPagination } = require("./_shared");
const { formatResponse, ErrorResponse } = require("../utils");

exports.getAllAdmins = function (req, res) {
	req.queryDBArgs = {
		Model: Admin,
		filter: {},
	};
	return handleGetWithOptionalPagination(req, res);
};

exports.getAdmin = async function (req, res, next) {
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

	return res.status(200).json(formatResponse.forSuccess(admin));
};

exports.deleteAdmin = async function (req, res, next) {
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

	return res.status(200).json(formatResponse.forSuccess(admin));
};

exports.editAdmin = async function (req, res, next) {
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
		return res.status(200).json(formatResponse.forSuccess(editedAdmin));
	} catch (err) {
		console.log(err);
		return next(err);
	}
};

exports.register = async function (req, res, next) {
	const adminExist = await Admin.findOne({ email: req.validBody.email });
	if (adminExist)
		return next(new ErrorResponse("Le responsable existe dejà.", 400));

	const admin = new Admin({
		...req.validBody,
	});

	try {
		const savedAdmin = await admin.save();
		return res.status(201).json(formatResponse.forSuccess(savedAdmin));
	} catch (err) {
		return next(err);
	}
};

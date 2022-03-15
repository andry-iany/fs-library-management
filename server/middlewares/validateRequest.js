const { ErrorResponse } = require("../utils");

function validateRequest(...requiredProperties) {
	return (req, res, next) => {
		try {
			req.validBody = buildNonEmptyObject(req.body, requiredProperties);
			return next();
		} catch (err) {
			return next(new ErrorResponse("Donnée invalide.", 400));
		}
	};
}

function buildNonEmptyObject(requestBody, requiredProperties) {
	const object = {};
	for (let property of requiredProperties) {
		addPropToObjectIfValueDefinedOrNonEmptyArray(
			object,
			property,
			requestBody?.[property]
		);
	}
	return object;
}

function addPropToObjectIfValueDefinedOrNonEmptyArray(object, property, value) {
	if (value === undefined) throw new Error("");
	if (Array.isArray(value) && value.length === 0) throw new Error("");
	object[property] = value;
}

module.exports = validateRequest;

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
		addPropToObjectIfValueDefined(object, property, requestBody?.[property]);
	}
	return object;
}

function addPropToObjectIfValueDefined(object, property, value) {
	if (isUndefined(value)) throw new Error("");
	object[property] = value;
}

function isUndefined(value) {
	return value === undefined;
}

module.exports = validateRequest;

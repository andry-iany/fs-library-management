const { ErrorResponse } = require("../utils");

module.exports = function checkRequiredProps(...requiredProperties) {
	return (req, res, next) => {
		try {
			req.validBody = buildObjectFromRequiredProps(
				req.body,
				requiredProperties
			);
			return next();
		} catch (err) {
			return next(new ErrorResponse("Donnée invalide.", 400));
		}
	};
};

function buildObjectFromRequiredProps(requestBody, requiredProperties) {
	const object = {};
	for (let property of requiredProperties) {
		addPropertyToObjectIfValueValid(object, property, requestBody?.[property]);
	}
	return object;
}

/**
 * The value is said to be valid if and only if:
 * - non empty array OR
 * - not falsy (except for boolean false)
 */
function addPropertyToObjectIfValueValid(object, property, value) {
	if (isString(value)) value = value.trim();

	const checks = [isEmptyArray(value), isFalsyAndNotBoolean(value)];

	for (let checkResult of checks) {
		if (checkResult) throw new Error("");
	}

	object[property] = value;
}

function isString(value) {
	return typeof value === "string";
}

function isEmptyArray(value) {
	return Array.isArray(value) && value.length === 0;
}

function isFalsyAndNotBoolean(value) {
	return typeof value !== "boolean" && !value;
}

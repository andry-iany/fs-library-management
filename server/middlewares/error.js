const { ErrorResponse } = require("../utils");

function handleError(err, req, res, next) {
	let error;

	if (err instanceof ErrorResponse) {
		error = err;
	} else if (err.name === "ValidationError") {
		// mongoose validation error
		error = new ErrorResponse("Donnée invalide.", 400);
	} else {
		error = new ErrorResponse("Une erreur s'est produite.", 500);
	}

	res.status(error.statusCode).json({ error: error.message });
}

module.exports = handleError;

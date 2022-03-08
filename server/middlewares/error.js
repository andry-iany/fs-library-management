function handleError(error, req, res, next) {
	res.status(error?.statusCode || 500).json({
		message: error.message || "Une erreur s'est apparue.",
	});
}

module.exports = handleError;

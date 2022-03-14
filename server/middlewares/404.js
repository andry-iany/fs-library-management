const { ErrorResponse } = require("../utils");

function handle404(req, res, next) {
	return next(new ErrorResponse("Not Found", 404));
}

module.exports = handle404;

const { logger } = require("../utils");

function handleError() {
	process.on("uncaughtException", (err) => {
		logger.log("error", err);
		process.exit(1);
	});

	process.on("unhandledRejection", (err) => {
		logger.log("error", err);
		process.exit(1);
	});
}

module.exports = { handleError };

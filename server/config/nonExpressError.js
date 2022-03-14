function handleError() {
	process.on("uncaughtException", (err) => {
		console.log("UNCAUGHT ERROR:", err);
	});

	process.on("unhandledRejection", (err) => {
		console.log("UNHANDLED REJECTION:", err);
	});
}

module.exports = { handleError };

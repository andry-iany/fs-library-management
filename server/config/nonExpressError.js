function handleNonExpressError() {
	process.on("uncaughtException", (err) => {
		console.log(`UNCAUGHT ERROR: ${err.message}`);
	});

	process.on("unhandledRejection", (err) => {
		console.log(`UNHANDLED REJECTION: ${err.message}`);
	});
}

module.exports = { handleNonExpressError };

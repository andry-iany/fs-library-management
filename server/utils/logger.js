exports.log = function (level, content) {
	const message = getLevelMessage(level);
	console.log(`${message}: ${content}`);
};

function getLevelMessage(level = "") {
	const logLevels = ["info", "warning", "error"];
	return logLevels.find((lv) => lv === level)?.toUpperCase() || "INFO";
}

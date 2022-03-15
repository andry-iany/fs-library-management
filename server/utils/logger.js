exports.log = function (level, content) {
	const message = _getLevelMessage(level);
	console.log(`${message}: ${content}`);
};

function _getLevelMessage(level = "") {
	const logLevels = ["info", "warning", "error"];
	return logLevels.find((lv) => lv === level)?.toUpperCase() || "INFO";
}

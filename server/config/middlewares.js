const express = require("express");
const cors = require("cors");

exports.applyPreRoutesMiddlewares = function (app) {
	const middlewaresBeforeRoutes = [
		cors(),
		express.json(),
		express.urlencoded({ extended: false }),
	];

	_applyMiddlewares(app, middlewaresBeforeRoutes);
};

exports.applyPostRoutesMiddlewares = function (app) {
	const middlewaresAfterRoutes = [
		require("../middlewares/404"),
		require("../middlewares/error"), // express error handler
	];

	_applyMiddlewares(app, middlewaresAfterRoutes);
};

function _applyMiddlewares(app, middlewares) {
	app.use(middlewares);
}

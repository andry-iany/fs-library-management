function applyRoutes(app) {
	const routes = require("../routes");
	for (let route of Object.keys(routes)) {
		app.use(`/${route}`, routes[route]);
	}
}

module.exports = { applyRoutes };

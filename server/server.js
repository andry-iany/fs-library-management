const express = require("express");
const { db, routes, middlewares } = require("./config");

async function startServer() {
	const app = express();
	const port = process.env.PORT || 8080;

	await db.connect();

	middlewares.applyPreRoutesMiddlewares(app);
	routes.applyRoutes(app);
	middlewares.applyPostRoutesMiddlewares(app);

	app.listen(port, () => console.log(`Server is running on port: ${port}`));
}

module.exports = startServer;

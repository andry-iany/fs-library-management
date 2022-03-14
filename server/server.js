const cors = require("cors");
const express = require("express");
const { db, routes } = require("./config");

const app = express();
const port = process.env.PORT || 8080;

async function startServer() {
	await db.connect();

	// middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// routes
	routes.applyRoutes(app);

	// 404
	app.use(require("./middlewares/404"));

	// error handler
	app.use(require("./middlewares/error"));

	app.listen(port, () => console.log(`Server is running on port: ${port}`));
}

module.exports = startServer;

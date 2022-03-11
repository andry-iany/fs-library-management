const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 8080;

async function startServer() {
	await connectDB();

	// middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// routes
	app.use("/users", require("./routes/users"));
	app.use("/books", require("./routes/books"));
	app.use("/rental", require("./routes/rental"));
	app.use("/auth", require("./routes/auth"));

	// 404
	app.use(require("./routes/404"));

	// error handler
	app.use(require("./middlewares/error"));

	app.listen(port, () => console.log(`Server is running on port: ${port}`));
}

module.exports = startServer;

require("dotenv").config({ path: "./.env" });

const { nonExpressError } = require("./config");
const startServer = require("./server");

nonExpressError.handleError();

startServer();

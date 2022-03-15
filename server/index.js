require("dotenv").config({ path: "./.env" });

const { nonExpressError } = require("./config");
nonExpressError.handleError();

const startServer = require("./server");
startServer();

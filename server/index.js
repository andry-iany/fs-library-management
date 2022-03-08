require("dotenv").config({ path: "./.env" });

const { handleNonExpressError } = require("./config/nonExpressError");
const startServer = require("./server");

handleNonExpressError();

startServer();

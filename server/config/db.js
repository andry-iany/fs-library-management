const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

async function connect() {
	await mongoose.connect(mongoURI);
	console.log("MongoDB connected.");
}

module.exports = { connect };

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const { Admin } = require("../models");

async function connect() {
	await mongoose.connect(mongoURI);
	console.log("MongoDB connected.");
}

async function createFirstManagerIfNeeded() {
	const managers = await Admin.find({ role: "manager" });
	if (managers.length === 0) {
		const manager = new Admin({
			nom: "manager",
			password: "password",
			email: "manager@mg.com",
			role: "manager",
		});
		await manager.save();
	}
}

module.exports = { connect, createFirstManagerIfNeeded };

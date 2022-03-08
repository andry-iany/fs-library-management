function register(req, res, next) {
	return res.json({ data: "user registered successfully" });
}

module.exports = { register };

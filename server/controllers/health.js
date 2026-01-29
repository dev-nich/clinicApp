const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (request, response) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
		DBActive: await User.findOne({}) ? true : false
	};
	try {
		response.send(healthcheck);
		} catch (e) {
			healthcheck.message = e;
			response.status(503).send();
	}
});

module.exports = router;

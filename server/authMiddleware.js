const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../server/config.js");

module.exports = function(req, res, next) {   // ^ Проверка токена
	const token = req.cookies.token;   // ^ Получаю токен из куки

	try {
		const user = jwt.verify(token, jwtSecret);
	} catch (e) {
		res.redirect("/");
	}

	next();
}
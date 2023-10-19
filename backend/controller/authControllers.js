const bcrypt = require('bcrypt');
const { format } = require('date-fns');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const KEY = process.env.SECRET_KEY;

function checkBody(body) {
	return body.hasOwnProperty('name');
}

module.exports.login = async function (req, res) {
	const applicant = await User.findOne({ email: req.body.email });
	const now = new Date();
	const formattedDate = format(now, 'HH:mm:ss, d MMM, yyyy');

	if (applicant && applicant.active) {
		//TODO: Проверка пароля пользователя с поролем из баззы данных
		const password = req.body.password;
		const compare = bcrypt.compareSync(password, applicant.password);
		if (compare) {
			//TODO: Сгенирировать Token
			const token = jwt.sign(
				{
					email: applicant.email,
					userId: applicant._id
				},
				KEY,
				{ expiresIn: '60m' }
			);
			res.status(200).json({
				token: `Bearer ${token}`
			});
			applicant.time = formattedDate
			applicant.active = true
			await applicant.save()
		} else {
			res.status(401).json({
				message: "Password don't match"
			});
		}
	} else {
		//TODO: Ошибка о том что такого пользовтеля нет, зарегистрируйтесь, ошибка
		res.status(404).json({
			message: 'User to this email not found, register'
		});
	}
};

module.exports.register = async function (req, res) {
	const body = req.body;
	const check = checkBody(body);
	if (!check) {
		res.status(400).json({
			message: "Request haven't 'name'"
		});
	}
	//TODO: name, email, password
	const applicant = await User.findOne({ email: req.body.email });

	if (applicant) {
		res.status(409).json({
			message: 'This email address exist'
		});
	} else {
		const salt = bcrypt.genSaltSync(12);
		const password = req.body.password;
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
			active: true
		});

		try {
			await user.save();
			res.status(201).json(user);
		} catch (e) {
			//TODO: Обработать ошибку
			res.status(500).json({
				success: false,
				message: e.message ? e.message : e
			});
		}
	}
};

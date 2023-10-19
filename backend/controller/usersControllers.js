const User = require('../models/user');

module.exports.getUsers = async function (_, res) {
	try {
		const users = await User.find({});
		if (!users.length) {
			res.status(404).json({
				message: 'Users not found'
			});
		} else {
			res.status(200).json(users);
		}
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message ? e.message : e
		});
	}
};

module.exports.getUserById = async function (res, req) {
	try {
		const user = await User.findById(res.params.id);
		req.status(200).json(user);
	} catch (e) {
		req.status(500).json({
			success: false,
			message: e.message ? e.message : e
		});
	}
};

module.exports.deleteUserById = async function (res, req) {
	try {
		const deletedUser = await User.findByIdAndDelete(res.params.id);
		req.status(200).json(deletedUser);
	} catch (e) {
		req.status(500).json({
			success: false,
			message: e.message ? e.message : e
		});
	}
};

module.exports.activeBlockUser = async function (req, res) {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.status(200).json(user);
	} catch (e) {
		res.status(500).json({
			success: false,
			message: e.message ? e.message : e
		});
	}
};

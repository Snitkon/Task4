// const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
require('dotenv').config();

const KEY = process.env.SECRET_KEY;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: KEY
};

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await User.findById(payload.userId).select('email id');

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (e) {
				console.log(e);
			}
		})
	);
};

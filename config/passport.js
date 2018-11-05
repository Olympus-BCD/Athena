const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models').User;
const secret = require('./settings').secret;

//	Create a new Passport JWT Strategy
module.exports = passport => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		console.log('JWT Payload:', jwt_payload._id, jwt_payload.id);
		User.findOne({_id: jwt_payload._id}, (err, user) => {
			if(err) return done(err, false);
			if(user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};
const passport = require('passport');
const Student = require('../model/student');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'test';

passport.use(new JwtStrategy(opts, async function (payload, done) {

    try {
        const student = await Student.findById(payload)
        if (student) {
            done(null, student)
        } else {
            done(null, false)
        }
    } catch (error) {
        done(error, false)
    }

}))

module.exports = passport

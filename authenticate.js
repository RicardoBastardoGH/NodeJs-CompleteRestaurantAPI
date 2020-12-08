var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
// provide a json web token strategy for configurating our passport module
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config');
//const { Strategy } = require('passport');


// configurando passport con  una nueva Local Strategy
// User.authenticate gracias al plugin de mongoose usado en el modelo
exports.local = passport.use(new LocalStrategy(User.authenticate()));


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
}

// options to the JWT based Strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey

// Passport Strategy
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        //this is the verify function of the JWTStrategy
        // DONE is the callback that is provided by passport
        /* Through this done parameter, you will be passing back information to passport 
            which it will then use for loading things onto the request message. 
            So, when passport parses the request message, it will use the strategy and then 
            extract information, and then load it onto our request message. */
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(params, err, next) {
    if (params.user.admin){
      return next();
    } 
    else {
        console.log(params);
        err = new Error('You are not authorized to perform this operations.');
        err.status = 404;
        return next(err);
    }
};

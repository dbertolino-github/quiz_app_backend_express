const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userMongo = require('../mongoose/models/User')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook')
const credentials = require('./credentials')

/*
JWT authorization
*/
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : credentials.secret
},(jwtPayload, cb) => {
    cb(null, jwtPayload)
}));

/*
GOOGLE OAUTH STRATEGY
*/
passport.use(new GoogleStrategy({
    clientID: '633208755427-r1g7kodpfhoank42nif3eaakl4av9a2p.apps.googleusercontent.com',
    clientSecret: 'R2Pn1ZaCed2zX6Dhs7Y3ZO7N',
    callbackURL: "https://api.beaverstudio.it/quiz/users/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    userMongo.findOne().lean().exec({provider_id : profile.id}, (err,result) => { 
        if(!result){
            user = {
                provider: 'Google',
                provider_id:  profile.id,
                name: profile.displayName
            }
            var userObj = new userMongo(user);
            userObj.save((err, user) => {return done(err, user);});
        }else{ 
            user = result
            return done(err, user)
        }
    });
  }
));

/*
FACEBOOK OAUTH STRATEGY
*/
passport.use(new FacebookStrategy({
    clientID: '218689779021497',
    clientSecret: '26133820a0861fa1c05d709afa63db06',
    callbackURL: "https://api.beaverstudio.it/quiz/users/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    userMongo.findOne().lean().exec({provider_id : profile.id}, (err,result) => { 
        if(!result){
            user = {
                provider: 'Facebook',
                provider_id:  profile.id,
                name: profile.displayName
            }
            var userObj = new userMongo(user);
            userObj.save((err, user) => {return done(err, user);});
        }else{ 
            user = result
            return done(err, user)
        }
    });
  }
));


module.exports = passport
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const passport = require('../../auth/passport')
const credentials = require('../../auth/credentials')

/*
GOOGLE oAuth2.0
*/
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/auth/google/callback', passport.authenticate('google', {session: false}), 
        (req, res) => {
                token_id = uuid.v4()
                token_info = {sub : req.user.provider_id, jti : token_id}
                const token = jwt.sign(token_info, credentials.secret, { expiresIn: '720m' });
                res.json({user : req.user, jwt_token : token});
        });
/*
FACEBOOK oAuth2.0
*/
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false}), 
        (req, res) => {
                token_id = uuid.v4()
                token_info = {sub : req.user.provider_id, jti : token_id}
                const token = jwt.sign(token_info, credentials.secret, { expiresIn: '720m' });
                res.json({user : req.user, jwt_token : token});
        });

module.exports = router;



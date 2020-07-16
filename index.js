const express = require('express') // Importing express framework
const helmet = require('helmet') // https://nodejstutorial.it/expressjs/sicurezza-con-il-modulo-helmet/
const passport = require('./auth/passport')
const bodyParser = require('body-parser')
var https = require('https');
var privateKey  = fs.readFileSync(__dirname + 'sslcert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + 'sslcert/server.crt', 'utf8');

app = express()

// Useful ready out-of the middleware functions
app.use(helmet())
app.use(passport.initialize()); 
app.use(bodyParser.json()); // Used to parse JSON body of requests

// Passing routes to server app
app.use('/quiz/answers', passport.authenticate('jwt', {session: false}), require('./routes/quiz/answers'))
app.use('/quiz/questions',passport.authenticate('jwt', {session: false}), require('./routes/quiz/questions'))
app.use('/quiz/users', require('./routes/quiz/users'))

//Lanching the server
const PORT = process.env.PORT || 60443
var cred = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(cred, app);
httpServer.listen(PORT, () => console.log('Server started on port %i', PORT))
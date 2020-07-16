var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/quiz_app_db', { useNewUrlParser: true })

// define schema for users
var userSchema = new Schema({
    provider: String,
    provider_id: String,
    name: String
})

var User = mongoose.model('User', userSchema, 'users')
module.exports = User
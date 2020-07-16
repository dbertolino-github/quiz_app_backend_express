var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/quiz_app_db',{ useNewUrlParser: true })

// define schema for answers
var correctionSchema = new Schema({
    id_quiz: { type: String, required: true, unique: true },
    author: String,
    institution: String,
    degree: String,
    course: String,
    questions: [
        {
            question_id: String,
            correct_answer: Number
        }
    ]
})

var Correction = mongoose.model('Correction', correctionSchema, 'corrections')
module.exports = Correction
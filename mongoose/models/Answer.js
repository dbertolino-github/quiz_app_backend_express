var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/quiz_app_db',{ useNewUrlParser: true })

// define schema for answers
var answerSchema = new Schema({
    id_quiz: { type: String, required: true, unique: true },
    id_user: { type: String, required: true, unique: true },
    time_to_complete: Number,
    date: String,
    answers: [
        {
            id_question : String,
            question: String,
            answerA : String,
            answerB : String,
            answerC : String,
            answerD: String,
            chapter: Number,
            answer: Number,
            correct_answer: Number,
            correct: Boolean
        }
    ]
})

var Answer = mongoose.model('Answer', answerSchema, 'answers')
module.exports = Answer
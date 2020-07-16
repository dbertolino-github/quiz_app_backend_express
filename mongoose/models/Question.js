var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/quiz_app_db', { useNewUrlParser: true })

// define schema for quizzes
var questionSchema = new Schema({
    id_quiz: { type: String, required: true, unique: true },
    author: String,
    institution: String,
    degree: String,
    course: String,
    questions: [
        {
            question_id: String,
            question: String,
            answerA: String,
            answerB: String,
            answerC: String,
            answerD: String,
            chapter: Number
        }
    ]
})


var Question = mongoose.model('Question', questionSchema, 'questions')
module.exports = Question 
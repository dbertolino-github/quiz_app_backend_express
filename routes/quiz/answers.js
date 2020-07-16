const express = require('express')
const router = express.Router()
const answersMongo = require('../../mongoose/models/Answer')
const correctionsMongo = require('../../mongoose/models/Correction')

router.post('/reply', (req, res) => {
    quiz_identifier = req.body.id_quiz
    correctionsMongo.findOne().lean().exec({id_quiz : quiz_identifier}, (err, corrections_doc) => {
        if(err){
            res.status(404)
            res.send('Correction resource not found')
        }else{
            json = req.body
            user_answers = json.answers
            corrections = corrections_doc.answers
            user_answers.forEach((ans,index)=>{
                var correction = corrections.find(corr => {
                    return corr.question_id === ans.question_id
                })
                ans.correct_answer = correction.correct_answer
                if(ans.correct_answer === ans.answer){ ans.correct = true }
                else{ans.correct = false}
            })
            json.corrected_answers = user_answers
            correctedAnswersObj = new answersMongo(json)
            correctedAnswersObj.save((err,result) => {
                if (err) {
                    res.status(404)
                    res.send('Correction resource not found')
                }else{
                    res.send(json)
                }
              })
            res.send(json)
        }
    })
})

router.get('/stats', (req, res) => {
    user = req.query.id_user
    quiz = req.query.id_quiz
    answersMongo.find().lean().exec({id_user : user, id_quiz : quiz}, (err, replies)=> {
        if(err) {
            res.status(404)
            res.send('No answers found')
        } else {
            time_sum = 0
            number_of_answers = 0
            correct_answers = 0
            replies.forEach((rep, index) => {
                time_sum += rep.time_to_complete
                number_of_answers += rep.answers.length
                correct_ones = rep.answers.filter((ans => {
                    return ans.correct === true
                }))
                correct_answers += correct_ones.length
            })
            avg_time_per_quiz = time_sum / replies.length
            res.send({
                total_time : time_sum,
                avg_time : avg_time_per_quiz,
                total_answers : number_of_answers,
                total_correct_answers : correct_answers
            })
        }
    })
})

module.exports = router;
const express = require('express')
const router = express.Router()
const questionsMongo = require('../../mongoose/models/Question')

router.get('/', (req, res) => {
    questionsMongo.findOne().lean().exec({ id_quiz: req.query.id_quiz }, (err, quiz_doc) => {
        if (err) {
            res.status(404)
            res.send('Resource not found')
        }
        else if(req.query.id_quiz==='DIRITTO_PUBBLICO_INSUBRIA' && (req.query.n_questions>180 ||req.query.n_questions<1)){
          res.status(404)
          res.send('Params not correct')
        }else{
          questions = shuffle(quiz_doc.questions)
          selected_questions = questions.slice(0,req.query.n_questions)
          quiz_doc.questions = selected_questions
          selected_quiz = JSON.stringify(quiz_doc)
          res.contentType('application/json')
          res.send(selected_quiz)
        }
      });
})

/*
The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
See https://github.com/coolaj86/knuth-shuffle
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

module.exports = router;
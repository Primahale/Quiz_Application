const mongoose = require('mongoose');

const qustionSchema = new mongoose.Schema({
  question :String,
  options : [String],
  correctAnswer : String,
});

const quizSchema = new mongoose.Schema({
  title : {type:String,  required: true},
  questions : [qustionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);

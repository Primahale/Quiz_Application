const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();


router.post('/quizzes', async (req, res) => {
  const { questions, title } = req.body;

  // if (!question || !options || correctAnswer === undefined) {
  //   return res.status(400).json({ message: 'All fields are required' });
  // }

  try {
    const newQuiz = new Quiz({ title , questions });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving quiz' });
  }
});


router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving quizzes' });
  }
});

module.exports = router;

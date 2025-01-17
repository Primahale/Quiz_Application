const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();


router.post('/add-quiz', async (req, res) => {
  const { quizTitle, questions } = req.body;
  try {
      const newQuiz = new Quiz({ title: quizTitle, questions });
      await newQuiz.save();
      res.status(201).json({ message: 'Quiz added successfully!' });
  } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ message: 'Error adding quiz.', error });
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

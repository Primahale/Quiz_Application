require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const Quiz = mongoose.model('Quiz', quizSchema);


app.post('/api/quizzes', async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const quiz = new Quiz({ question, options, correctAnswer });
    await quiz.save();
    res.status(201).json({ message: 'Quiz added successfully', quiz });
  } catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ error: 'Failed to add quiz' });
  }
});

app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

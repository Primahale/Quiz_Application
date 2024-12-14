import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = ({ onQuizAdded }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { question, options, correctAnswer };

    try {
      const response = await axios.post('https://quiz-application-3-grm7.onrender.com/api/quizzes', quizData);
      onQuizAdded(response.data);
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      alert('Quiz added successfully!');
    } catch (error) {
      // console.error('Error adding quiz:', error);
      // alert('Failed to add quiz.');
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Quiz</h2>
      <div>
        <label>Question:</label>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      <div>
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <div>
        <label>Correct Answer (Index):</label>
        <input
          type="number"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Quiz</button>
    </form>
  );
};

export default QuizForm;

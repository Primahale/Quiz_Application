import React, { useState } from 'react';
import QuizForm from './QuizForm';
import QuizList from './QuizList';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  const handleQuizAdded = (newQuiz) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
  };

  return (
    <div>
      <QuizForm onQuizAdded={handleQuizAdded} />
      <hr />
      <QuizList quizzes={quizzes} />
    </div>
  );
};

export default Quiz;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Score from './Score'; 

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(60); 
  // const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          handleNextQuestion(); 
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [currentIndex]);



  
  const handleAnswerChange = (quizId, selectedOption) => {
    // console.log(`Quiz ID: ${quizId},selected Option (Row):`,selectedOption)
    const parsedOption = parseInt(selectedOption+1,10);
    // console.log(`Quiz ID: ${quizId},selected Option (Parsed):`,parsedOption);
    
    setAnswers((prev) => ({
      ...prev,
      [quizId]: parsedOption 
      
    }));
    // console.log(quizId)
  };

  
  const handleSolveSubmit = (e) => {
    e.preventDefault();

    let correctCount = 0;

 
    quizzes.forEach((quiz) => {
      const userAnswer = answers[quiz._id]
      const correctAnswer = Number(quiz.correctAnswer);
      // console.log(`Quiz ID: ${quiz._id}, User Answer: ${userAnswer}, Correct Answer: ${quiz.correctAnswer}`);
      if (userAnswer === correctAnswer) { 
        correctCount++;
      }
    });

    
    setScore(correctCount);
    // console.log('Final Score:', correctCount);
    setIsModalOpen(true);
    // window.location.reload();
  };

  const handlePrevQuestion = () => {
    setCurrentIndex(currentIndex - 1);
    setTimer(60); 
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setTimer(60); 
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setScore(null);
    setCurrentIndex(0); 
    setAnswers({});
  };
  // window.location.reload();

  return (
    <div>
      <h2>Solve Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>Loading quizzes...</p>
      ) : (
        <form onSubmit={handleSolveSubmit}>
          {currentIndex < quizzes.length && (
            <div>
              <h3>{quizzes[currentIndex].question}</h3>
              {quizzes[currentIndex].options.map((option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name={quizzes[currentIndex]._id}
                      value={index}
                      checked={answers[quizzes[currentIndex]._id] === index + 1}
                      onChange={() => handleAnswerChange(quizzes[currentIndex]._id, index)}
                      required
                    />
                    {option}
                  </label>
                </div>
              ))}
              <div>
                <p style={{fontWeight:'bold'}}>Time remaining: {timer}s</p>
              </div>
              <div>
                {currentIndex > 0 && <button type="button" onClick={handlePrevQuestion}>Previous</button>}
                {currentIndex < quizzes.length - 1 ? (
                  <button type="button" onClick={handleNextQuestion}>Next</button>
                ) : (
                  <button type="submit">Submit Answers</button>
                )}
              </div>
            </div>
          )}
        </form>
      )}
      {score !== null && (
        <div className="modal">
          <div className="modal-content">
            <h2>Your Score</h2>
            <p>You scored {score} out of {quizzes.length}!</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;

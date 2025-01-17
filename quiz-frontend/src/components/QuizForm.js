import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/add-quiz', { quizTitle, questions });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding quiz:', error);
            alert(error.response?.data?.message || 'Failed to add quiz.');
        }
    };

    return (
        <div className="quiz-form">
            <h1>Create Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Quiz Title:</label>
                    <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} required />
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-block">
                        <label>Question {qIndex + 1}:</label>
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                            required
                        />
                        {question.options.map((option, oIndex) => (
                            <div key={oIndex}>
                                <label>Option {oIndex + 1}:</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <label>Correct Answer:</label>
                        <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default QuizForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'options') {
            updatedQuestions[index].options = value; // Update options
        } else {
            updatedQuestions[index][field] = value; // Update questionText or correctAnswer
        }
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/add-quiz', { quizTitle, questions });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Error adding quiz.');
        }
    };

    return (
        <div>
            <h2>Add Quiz</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    required
                />
                {questions.map((question, index) => (
                    <div key={index} style={{ marginTop: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Question Text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                            required
                        />
                        {question.options.map((option, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                placeholder={`Option ${optIndex + 1}`}
                                value={option}
                                onChange={(e) =>
                                    handleQuestionChange(index, 'options', [
                                        ...question.options.slice(0, optIndex),
                                        e.target.value,
                                        ...question.options.slice(optIndex + 1),
                                    ])
                                }
                                required
                            />
                        ))}
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={question.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addQuestion}>
                    Add Another Question
                </button>
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default AddQuiz;

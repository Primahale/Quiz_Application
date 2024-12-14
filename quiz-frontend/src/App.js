import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import './App.css';


function App() {
  return (
    <Router>
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
        <li style={{marginRight:'100px',marginLeft:'50px'}}><Link to="/">Quiz List</Link></li>
        <li><Link to="/create-quiz">Create Quiz</Link></li>
      </ul>
    </nav>
    <hr />
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="/create-quiz" element={<QuizForm />} />
    </Routes>
  </Router>
  );
}

export default App;

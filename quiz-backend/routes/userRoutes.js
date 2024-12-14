const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock user
const mockUser = { username: 'user', password: 'password' };


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;

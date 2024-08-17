const express = require('express');
const router = express.Router();
const auth = require('./authentication');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const response = await auth.registerUser(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await auth.loginUser(email, password);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to authenticate and verify token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = auth.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// Example protected route
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;

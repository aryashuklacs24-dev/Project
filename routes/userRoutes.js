const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect('/login');
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/car',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;
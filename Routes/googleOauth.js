const express = require('express');
const router = express.Router();
const passport = require('passport');
const { GoogleStrategy } = require('../Middleware/oauth');

// Google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect the user to the homepage or any other route
  res.redirect('/');
});

module.exports = router;

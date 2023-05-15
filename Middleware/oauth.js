require('dotenv').config()
const { google } = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/userModel')

// Configure Passport.js to use GoogleStrategy
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create a user based on the Google profile information
          let user = await User.findOne({ googleId: profile.id });
  
          if (!user) {
            // Create a new user if they don't exist
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              userName: profile.displayName,
            });
          }
  
          // Call the "done" function to proceed with authentication
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  module.exports = passport;

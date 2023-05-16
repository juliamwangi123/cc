require('dotenv').config()
const { google } = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/userModel')


const jwt = require('jsonwebtoken');

//generate token
const generateToken = (id)=>{
    //use sign method 2 argument paload and secrect
    return jwt.sign({id},process.env.SECRET, {expiresIn: '2d'});
};

// Configure Passport.js to use GoogleStrategy
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create a user based on the Google profile information
          let user = await User.findOne({ email: profile.emails[0].value });
  
          if (!user) {
            // Create a new user if they don't exist
              user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              userName: profile.displayName,
            });
          }
          
          const token = generateToken(user._id);

          // Call the "done" function to proceed with authentication
          done(null,{ user, token });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  module.exports = passport;

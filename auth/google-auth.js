const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:5000/users/success",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      //CHECK IF USER EXIST
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (user) {
          done(null, User);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          }).save((err, newUser) => {
            done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

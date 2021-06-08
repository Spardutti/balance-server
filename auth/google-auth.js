const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        "https://infinite-woodland-48479.herokuapp.com/users/success",
    },
    (accessToken, refreshToken, profile, done) => {
      //CHECK IF USER EXIST
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (user) {
          done(null, user);
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
  console.log("seralize");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log("deserialize");
    done(err, user);
  });
});

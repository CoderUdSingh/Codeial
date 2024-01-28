const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user_Schema");

passport.use(
  new googleStrategy(
    {
      // clientID:
      //   "785871020969-m44etqk4sclmvajpob9t072at2jkim2s.apps.googleusercontent.com",
      // clientSecret: "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",
      callbackURL: "http://127.0.0.1:8000/users/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile.emails[0].value);

        const user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          const newUser = await User.create({
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
            name: profile.displayName,
          });
          console.log(`Here is the new User${newUser}`);
          done(null, newUser);
        } else {
          done(null, user);
        }
      } catch (err) {
        console.log(`Error in google auth strategy ${err}`);
        done(null, false);
      }
    }
  )
);

module.exports = passport;

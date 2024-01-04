const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user_Schema");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        // If email does'nt match

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false, { message: "Invalid Username/Password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.use(
//   new LocalStrategy(
//     {
//       username: "email",
//     },
//     async function (email, password, done) {
//       try {
//         const user = await User.findOne({ email: username });

//         // If email does'nt match

//         if (!user || user.password != password) {
//           console.log("Invalid Username/Password");
//           return done(null, false, { message: "Invalid Username/Password" });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

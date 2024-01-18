const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user_Schema");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        // If email does'nt match

        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false, { message: "Invalid Username/Password" });
        }
        return done(null, user);
      } catch (err) {
        req.flash("error", err);
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

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;

const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/custom_mw");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: false,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded({ extended: true }));

////////////////////////////////////////////Setting up the DB//////////////////////////////////////////////////

const User = require("./models/user_Schema");

///////////////////////////////////////////Including Env File///////////////////////////////////////////////////

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//////////////////////////////////// Establishing DB Connection Through Mongoose//////////////////////////////////

// const dbLocal = process.env.DATABASE_LOCAL;
const URI = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(URI)
  .then(() => console.log("Dadabase Connection is Successful on Atlas"))
  .catch((err) => console.error(`Error in connecting the DB ${err}`));

// mongoose
//   .connect(dbLocal)
//   .then(() => console.log("Dadabase Connection is Successful"))
//   .catch((err) => console.error(`Error in connecting the DB ${err}`));

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

/////////////Including static files by making the assets folder available globally//////////////////

app.use(express.static("./assets"));
app.use(require("express-ejs-layouts"));

//////////////////////////////// Making uploads directory available for all ////////////////////
app.use("/uploads", express.static(__dirname + "/uploads"));

///////////////////////////////// Setting up the Express Layouts///////////////////////////////
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//////////////////////////////// Setting up the view engine properties/////////////////////////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//////////////////Setting up initial configuration for express-session before use /////////////

app.use(
  session({
    name: "codeial",
    //////// Needs to be changed before sending it into production ////////////
    secret: "MoyeMoye",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 6000 * 1000 },
    store: MongoStore.create({ mongoUrl: URI }),
  })
);

///////////////////////// To initialize passport library for use ///////////////////////////////
app.use(passport.initialize());

///////////////////////// To use express session//////////////////
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

/////////////////////////// To use flash(connect-flash) ///////////////////////////////////////

app.use(flash());
app.use(customMware.setFlash);

///////////////////////////////// Routing for the HomePage ////////////////////////////////////
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log(`Error in starting the server${err}`);
  console.log(`Server is running on port ${port}`);
});

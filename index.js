const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));

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

////////////////////////////////////Including static files////////////////////////////////////

app.use(express.static("./assets"));
app.use(require("express-ejs-layouts"));

///////////////////////////////// Setting up the Express Layouts///////////////////////////////
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//////////////////////////////// Setting up the view engine properties/////////////////////////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log(`Error in starting the server${err}`);
  console.log(`Server is running on port ${port}`);
});

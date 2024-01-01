const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

app.use(express.static("./assets"));
app.use(require("express-ejs-layouts"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log(`Error in starting the server${err}`);
  console.log(`Server is running on port ${port}`);
});

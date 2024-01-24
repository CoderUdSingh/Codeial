const jwt = require("jsonwebtoken");
const User = require("../../../models/user_Schema");

exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({ message: "Invalid Username or Password" });
    }

    return res.status(200).json({
      message: "SignedIn , Here is the Token, keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "10000000" }),
      },
    });
  } catch (err) {
    console.log(`Here is the error ${err}`);
  }
};

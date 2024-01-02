exports.profile = (req, res) => {
  return res.render("users", { title: "Users" });
};

// Rendering Sign Up Page
exports.signUp = (req, res) => {
  return res.render("user_sign_up", { title: "Users-Sign-Up" });
};

// Rendering Sign In Page
exports.signIn = (req, res) => {
  return res.render("user_sign_in", { title: "Users-Sign-In" });
};

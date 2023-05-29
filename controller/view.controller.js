const homePage = async (req, res, next) => {
  res.render("home-page");
};

const signupPage = async (req, res, next) => {
  res.render("signup-page");
};

const loginPage = async (req, res, next) => {
  res.render("login-page");
};

const panelPage = async (req, res, next) => {
  res.render("user-panel");
};

module.exports = { homePage, signupPage, loginPage, panelPage };

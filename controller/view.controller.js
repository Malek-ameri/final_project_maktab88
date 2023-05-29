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

const forgetPassworPage = async (req, res, next) => {
  res.render("forgetPassword-page");
};

module.exports = { homePage, signupPage, loginPage, panelPage, forgetPassworPage };

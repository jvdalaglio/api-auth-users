const authModel = require("../models/auth.model");

const authController = {
  login: (req, res) => {
    const response = authModel.login(req.body);

    if (response.status === 200) {
      res.status(response.status).json({
        message: response.message,
        user: response.user,
        token: response.token,
      });
    } else {
      res.status(response.status).json({
        message: response.message,
      });
    }
  },
  register: (req, res) => {
    const response = authModel.register(req.body, req.body.role);

    res.status(response.status).json({
      message: response.message,
      ...(response.user ? { user: response.user } : null),
    });
  },
};

module.exports = authController;

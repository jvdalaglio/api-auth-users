const dashboardController = {
  index: (req, res) => {
    res.status(200).json({ message: `Seja bem vindo, ${req.user.username}!` });
  },
};

module.exports = dashboardController;

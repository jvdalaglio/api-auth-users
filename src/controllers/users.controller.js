const usersModel = require("../models/users.model");

const usersController = {
  getAllUsers: (req, res) => {
    const response = usersModel.getAllUsers();

    if (response.status === 200) {
      res.status(response.status).json({
        message: response.message,
        users: response.users,
      });
    } else {
      res.status(response.status).json({
        message: response.message,
      });
    }
  },
  getUserById: (req, res) => {
    const { id } = req.params;
    const response = usersModel.getById(id);

    if (response.status === 200) {
      res.status(response.status).json({
        response,
      });
    } else {
      res.status(response.status).json({
        message: response.message,
      });
    }
  },
  editUser: (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        message: "Dados do usuário não fornecidos ou inválidos.",
      });
    }

    const response = usersModel.editUser(id, userData);

    if (response.status === 200) {
      res.status(response.status).json({
        response,
      });
    } else {
      res.status(response.status).json({
        response,
      });
    }
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    const response = usersModel.deleteUser(id);

    if (response.status === 200) {
      res.status(response.status).json({
        response,
      });
    } else {
      res.status(response.status).json({
        response,
      });
    }
  },
};

module.exports = usersController;

const deleteUser = require("../utils/deleteUser");
const editBaseUser = require("../utils/editUser");
const getUsers = require("../utils/getUsers");

const usersModel = {
  getAllUsers: () => {
    const users = getUsers();
    return {
      message: "Lista de usuários",
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      })),
      status: 200,
    };
  },
  getById: (id) => {
    const users = getUsers();
    const user = users.find((user) => user.id === +id);

    if (!user) {
      return {
        message: "Usuário não encontrado",
        status: 404,
      };
    }

    return {
      message: "Usuário encontrado",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      status: 200,
    };
  },
  editUser: (userId, payload) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === +userId);

    if (userIndex === -1) {
      return {
        message: "Usuário não encontrado",
        status: 404,
      };
    }

    const editedUser = Object.assign(users[userIndex], payload);

    editBaseUser(editedUser);

    return {
      message: "Usuário atualizado com sucesso",
      user: users[userIndex],
      status: 200,
    };
  },
  deleteUser: (userId) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === +userId);

    if (userIndex === -1) {
      return {
        message: "Usuário não encontrado",
        status: 404,
      };
    }

    deleteUser(userId);

    return {
      message: "Usuário deletado com sucesso",
      status: 204,
    };
  },
};

module.exports = usersModel;

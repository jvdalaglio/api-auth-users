const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = require("../utils/getUsers");
const checkExistingUser = require("../utils/checkExistingUser");
const addNewUser = require("../utils/addNewUser");
const validateFields = require("../utils/validateFields");

const authModel = {
  register: (user, role = "standard") => {
    const { username, email, password } = user;
    const users = getUsers();

    const erros = validateFields(user);

    if (Object.keys(erros).length > 0) {
      return {
        message: erros,
        status: 400,
      };
    }

    if (checkExistingUser(username, email)) {
      return {
        message: "Usuário ou e-mail já existentes",
        status: 400,
      };
    }

    const newUser = {
      id: users[users.length - 1].id + 1,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role,
    };

    addNewUser(newUser);

    return {
      message: "Usuário cadastrado com sucesso",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      status: 201,
    };
  },
  login: (user) => {
    const { email, password } = user;
    const users = getUsers();
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      return {
        message: "Usuário não encontrado",
        status: 404,
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordValid) {
      return {
        message: "Usuário e/ou senha incorreta",
        status: 401,
      };
    }

    try {
      const token = jwt.sign(
        {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        message: "Login realizado com sucesso",
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        },
        token,
        status: 200,
      };
    } catch (error) {
      return {
        message: `Erro ao gerar token: ${error.message}`,
        status: 500,
      };
    }
  },
};

module.exports = authModel;

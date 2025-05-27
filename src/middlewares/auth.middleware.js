const jwt = require("jsonwebtoken");
const getUsers = require("../utils/getUsers");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(200).json({ message: "Seja bem vindo, Visitante!" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    const users = getUsers();
    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const usersMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acesso negado: usuário não autorizado" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: `Token inválido: ${error.message}` });
  }
};

module.exports = usersMiddleware;

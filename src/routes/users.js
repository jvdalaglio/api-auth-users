const usersRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.post("/", authController.register);

usersRouter.put("/:id", usersController.editUser);

usersRouter.delete("/:id", usersController.deleteUser);

module.exports = usersRouter;

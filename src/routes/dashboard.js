const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const dashboardRouter = require("express").Router();

dashboardRouter.get("/", authMiddleware, dashboardController.index);

module.exports = dashboardRouter;

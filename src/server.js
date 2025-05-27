const express = require("express");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const usersRouter = require("./routes/users");
const usersMiddleware = require("./middlewares/users.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersMiddleware, usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

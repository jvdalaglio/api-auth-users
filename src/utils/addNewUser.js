const fs = require("fs");
const path = require("path");
const getUsers = require("./getUsers");

const addNewUser = (newUser) => {
  const users = getUsers();
  const usersPath = path.join(__dirname, "..", "..", "public", "users.json");

  users.push(newUser);

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
};

module.exports = addNewUser;

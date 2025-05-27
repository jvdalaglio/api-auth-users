const fs = require("fs");
const path = require("path");

const getUsers = () => {
  const usersPath = path.join(__dirname, "..", "..", "public", "users.json");
  const usersData = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(usersData);
};

module.exports = getUsers;

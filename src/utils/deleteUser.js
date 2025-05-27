const fs = require("fs");
const path = require("path");

const deleteUser = (userId) => {
  const usersPath = path.join(__dirname, "..", "..", "public", "users.json");
  const usersData = fs.readFileSync(usersPath, "utf-8");
  const users = JSON.parse(usersData);

  const userIndex = users.findIndex((u) => u.id === +userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
  } else {
    throw new Error("User not found");
  }
};

module.exports = deleteUser;

const getUsers = require("./getUsers");

const checkExistingUser = (username, email) => {
  const users = getUsers();
  return users.some(
    (user) => user.username === username || user.email === email
  );
};

module.exports = checkExistingUser;

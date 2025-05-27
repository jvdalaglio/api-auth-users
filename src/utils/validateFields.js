const validateFields = (user) => {
  const errors = {};

  validateEmail(user.email, errors);
  validateUsername(user.username, errors);
  validatePassword(user.password, errors);
  validateConfirmPassword(user.password, user.confirmPassword, errors);

  return errors;
};

const validateEmail = (email, errors) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Email inválido";
  }
};

const validateUsername = (username, errors) => {
  const usernameRegex = /^[a-zA-Z_ ]{3,}$/;
  if (!username || !usernameRegex.test(username)) {
    errors.username =
      "Nome de usuário deve ter pelo menos 3 caracteres alfabéticos";
  }
};

const validatePassword = (password, errors) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.password =
      "Senha deve conter pelo menos 8 caracteres, 1 número, 1 caractere especial e 1 letra maiúscula";
  }
};

const validateConfirmPassword = (password, confirmPassword, errors) => {
  if (password !== confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem";
  }
};

module.exports = validateFields;

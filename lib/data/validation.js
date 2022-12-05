export function validateEmail(email) {
  const emailRegex = /[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const validation = emailRegex.test(email);

  if (!email) return "Por favor, digite seu e-mail.";
  if (!validation) return "Formado de e-mail inválido.";
}

export function validatePassword(password) {
  if (!password) return "Por favor, digite sua senha.";
  if (password.length < 6)
    return "Sua senha deve ter, pelo menos, 6 caracteres.";
}

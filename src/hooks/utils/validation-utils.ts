export const getPasswordValidationStatus = (password: string) => {
  return {
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    // hasLowerCase: /[a-z]/.test(password),
    // hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasMinLength: password.length >= 8,
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };
};

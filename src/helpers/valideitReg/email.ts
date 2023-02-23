export const emailValid = Object.freeze({
  reg: {
    value: /^(?!-)[\w.-]{2,}@[\w-]+(\.[\w-]+)*\.[a-zA-Z]{2,}$/u,
    message: 'Incorrect email',
  },
  maxLength: {
    value: 63,
    message: 'The maximum length of an email is 63 characters',
  },
  minLength: {
    value: 7,
    message: 'The minimum length of an email is 7 characters',
  },
});

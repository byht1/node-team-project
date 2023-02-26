export const nameValid = Object.freeze({
  reg: {
    value: /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s,'"'-.]+(?:\s+[A-Za-zА-Яа-яЁёҐґІіЇїЄє]+){0,3}$/u,
    message: 'The name may contain only letters of the Latin and Cyrillic alphabets',
  },
  maxLength: {
    value: 40,
    message: 'The name must contain at least 2 characters',
  },
  minLength: {
    value: 2,
    message: 'The maximum name length is 40 characters',
  },
});

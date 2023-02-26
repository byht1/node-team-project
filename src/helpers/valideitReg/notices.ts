// порожній рядок - тільки пробіли

export const fieldsValid = Object.freeze({
  emptyField: {
    value: /^\s*\S/,
    message: "The field shouldn't be empty",
  },
  allowedCharacters: {
    value: /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s,'"’'-.]+$/u,
    message:
      'The fiels should contain only letters of the Latin and Cyrillic alphabets, quotation marks, apostrophes and dashes',
  },
  oneWord: {
    value: /^\w+$/u,
    message: 'The field should consist of one word',
  },
});

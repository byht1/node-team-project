export const commentValid = Object.freeze({
  emptyField: {
    value: /\S/,
    message: "The field shouldn't be empty",
  },
  minLength: {
    value: 2,
    message: 'Comment should at least 2 characters',
  },
  maxLength: {
    value: 200,
    message: 'The maximum comment length is 200 characters',
  },
});
export const ciryValid = Object.freeze({
  reg: {
    value: /^(?!\s)[a-zA-Zа-яА-ЯЁёҐґІіЇїЄє\s,'"'-.]+$/,
    // value: /^[a-zA-Zа-яА-ЯЁёҐґІіЇїЄє\s,'"'-.]+$/,
    message: 'The name of the city or region must contain only letters',
  },
  maxLength: {
    value: 50,
    message: 'The city name must contain at least 2 characters',
  },
  minLength: {
    value: 2,
    message: 'The maximum city length is 40 characters',
  },
});

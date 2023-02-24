export const removeExtraSpaces = (obj: { [key: string]: any }): { [key: string]: any } => {
  const newObj = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      newObj[key] = value.replace(/\s+/g, ' ').trim();
    }

    else if (typeof value === 'object') {
      newObj[key] = removeExtraSpaces(value);
    }

    else {
      newObj[key] = value;
    }
  }
  return newObj;
}

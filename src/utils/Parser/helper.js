export const capitalize = str => {
  let lower = str.toLowerCase();
  return lower.replace(/\b\w/g, l => l.toUpperCase());
};
export const VALID_NAME = /^[a-zA-Z0-9 _-]+$/i;

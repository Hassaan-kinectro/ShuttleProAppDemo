export const capitalize = str => {
  let lower = str.toLowerCase();
  return lower.replace(/\b\w/g, l => l.toUpperCase());
};

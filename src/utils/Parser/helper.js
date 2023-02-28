export const capitalize = str => {
  let lower = str.toLowerCase();
  return lower.replace(/\b\w/g, l => l.toUpperCase());
};
export const VALID_NAME = /^[a-zA-Z0-9 _-]+$/i;
const imageTypes = [
  {type: 'image/jpeg', name: '.jpg'},
  {type: 'image/jpg', name: '.jpg'},
  {type: 'image/png', name: '.png'},
  {type: 'image/tif', name: '.tif'},
  {type: 'audio/m4a', name: '.m4a'},
  {type: 'audio/mp4', name: '.mp4'},
  {type: 'audio/m4v', name: '.m4v'},
  {type: 'audio/mpeg', name: '.mpeg'},
];
export const getExtension = type => {
  const t = imageTypes.find(m => m.type === type);
  if (t) {
    return t.name;
  }
  return '.jpg';
};

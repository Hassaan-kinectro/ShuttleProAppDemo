import {convertImageTobase64} from '../../utils/urlParser';

let base64Images;
export const handleConvert = async imageUrl => {
  base64Images = [];
  for (const image of imageUrl) {
    const base64 = await convertImageTobase64(image);
    base64Images.push(base64);
  }
  return base64Images;
};

import enviroment from '../../config/environment';
import {ImageNotFound} from '../imagesPath';
// import RNFetchBlob from 'rn-fetch-blob';
import {isEmpty} from 'lodash';

const ImageExtensions = [
  {name: 'jpeg', code: 'image/jpeg'},
  {name: 'jpg', code: 'image/jpeg'},
  {name: 'png', code: 'image/png'},
  {name: 'gif', code: 'image/gif'},
];
const ImageExtensionsList = [
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/png',
  'jpeg',
  'jpg',
  'png',
  'gif',
];

export const ResolvePostImage = product => {
  let image = ImageNotFound;
  if (product) {
    if (product.product_attachments[0].image.thumb) {
      console.log('thumImages', product.product_attachments[0].image.thumb.url);
      image = product.product_attachments[0].image.thumb.url;
    } else if (product.product_attachments[0].image) {
      image = product.product_attachments[0].image;
    } else if (product.avatar_new && product.avatar_new.url) {
      image = ImageUrl(product.avatar_new.url);
    } else {
      if (product && product.vimeo_file && product.vimeo_file.url) {
        image = ImageUrl(product.vimeo_file.url);
      } else if (
        product &&
        product.template_file &&
        product.template_file.url
      ) {
        image = ImageUrl(product.template_file.url);
      }
    }
  }
  return {uri: image};
};
export const ResolveImages = product => {
  let image = ImageNotFound;
  console.log('That Products', product);
  if (
    product &&
    product.product_attachments &&
    product.product_attachments.length > 0
  ) {
    if (product.product_attachments[0].image.thumb) {
      console.log('thumImages', product.product_attachments[0].image.thumb.url);
      image = product.product_attachments[0].image.thumb.url;
    } else if (product.product_attachments[0].image) {
      image = product.product_attachments[0].image.url; //first priority aws images then others!!!!
    } else if (product.product_attachments[0].avatar_new.url) {
      image = ImageUrl(product.product_attachments[0].avatar_new.url);
    } else if (product.product_attachments[0].vimeo_file.url) {
      image = ImageUrl(product.product_attachments[0].vimeo_file.url);
    } else if (product.product_attachments[0].template_file.url) {
      image = ImageUrl(product.product_attachments[0].template_file.url);
    }
  }
  return {uri: image};
};

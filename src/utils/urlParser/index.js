import {ImageNotFound} from '../imagesPath';

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

  if (
    product &&
    product.product_attachments &&
    product.product_attachments.length > 0
  ) {
    if (product.product_attachments[0].image.thumb) {
      console.log('thumImages', product.product_attachments[0].image.thumb.url);
      image = product.product_attachments[0].image.thumb.url;
    } else if (product.product_attachments[0].image) {
      image = product.product_attachments[0].image.url;
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

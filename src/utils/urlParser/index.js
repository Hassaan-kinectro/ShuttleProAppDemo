/* eslint-disable no-undef */
import {ImageNotFound} from '../imagesPath';
import RNFetchBlob from 'rn-fetch-blob';
import {isEmpty} from 'lodash';
const fs = RNFetchBlob.fs;
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
const ImageExtensions = [
  {name: 'jpeg', code: 'image/jpeg'},
  {name: 'jpg', code: 'image/jpeg'},
  {name: 'png', code: 'image/png'},
  {name: 'gif', code: 'image/gif'},
];

const ExtractExtension = name => {
  let ext = name.split('.').pop();
  const obj = ImageExtensions.find(e => e.name === ext);
  if (obj) {
    ext = obj.code;
  } else {
    ext = 'video/' + ext;
  }
  return ext;
};

export const convertImageTobase64 = image => {
  console.log('convert image', image);
  return new Promise(async (resolve, reject) => {
    const fileName = image.split('/').pop();
    const ext = ExtractExtension(fileName);
    let imagePath = null;
    let status = 404;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', image)
      .then(resp => {
        if (resp.respInfo.status) {
          status = resp.respInfo.status;
        }
        imagePath = resp.path();
        const t = resp.readFile('base64');
        return t;
      })
      .then(async base64Data => {
        fs.unlink(imagePath);
        const d = base64Data;
        console.log(d, 'this is sssssss');
        return resolve({
          status: status,
          image: d && 'data:' + ext + ';base64,' + d,
        });
      });
  });
};

export const ResolveStoryImageList = async (imageArray, base64) => {
  return new Promise(async (resolve, reject) => {
    console.log('ImageArray===>>', imageArray, base64);
    let image = ImageNotFound;
    let id = null;
    let skip = true;
    let imageList = [];
    if (imageArray && imageArray.length > 0) {
      await Promise.all(
        imageArray.map(async i => {
          if (base64) {
            let resp = await convertImageTobase64(i);
            console.log('The response', resp.image, '<<---');
            if (resp.status === 200) {
              image = resp.image;
              // console.log('ImageArray===2222>>',resp)

              if (!isEmpty(image)) {
                imageList.push({
                  image: image,
                });
              }
              return image;
            } else {
              image = ImageNotFound;
            }
          }
        }),
      );
    }
    return resolve(imageList);
  });
};

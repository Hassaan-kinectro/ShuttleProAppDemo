import RNFetchBlob from 'rn-fetch-blob';
import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getExtension} from '../../utils/Parser/helper';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProduct = async (values, workspaceId, setLoading) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const data = new FormData();
  if (values.images && values.images.length > 0) {
    Object.keys(values.images).map((key, index) => {
      if (values.images[key]) {
        data.append('avatar_new', {
          uri: values.images[key].path, // your file path string
          name: values.images[key].filename
            ? values.images[key].filename
            : Math.random().toString(36).slice(2) +
              getExtension(values.images[key].mime),
          type: values.images[key].mime,
        });
      }
      return null;
    });
  }
  if (values.mobileImages && values.mobileImages.length > 0) {
    Object.keys(values.mobileImages).map((key, index) => {
      if (values.mobileImages[key]) {
        data.append('mobile_view', {
          uri: values.mobileImages[key].path, // your file path string
          name: values.mobileImages[key].filename
            ? values.mobileImages[key].filename
            : Math.random().toString(36).slice(2) +
              getExtension(values.mobileImages[key].mime),
          type: values.mobileImages[key].mime,
        });
      }
      return null;
    });
  }
  if (values.audiofile && values.audiofile.length > 0) {
    Object.keys(values.audiofile).map((key, index) => {
      if (values.audiofile[key]) {
        data.append('audio_file', {
          uri: values.audiofile[key].path, // your file path string
          name: values.audiofile[key].filename
            ? values.audiofile[key].filename
            : Math.random().toString(36).slice(2) +
              getExtension(values.audiofile[key].type),
          type: values.audiofile[key].type,
        });
      }
      return null;
    });
  }
  if (values.videofile && values.videofile.length > 0) {
    Object.keys(values.videofile).map((key, index) => {
      if (values.videofile[key]) {
        data.append('video_file', {
          uri: values.videofile[key].path, // your file path string
          name: values.videofile[key].filename
            ? values.videofile[key].filename
            : Math.random().toString(36).slice(2) +
              getExtension(values.videofile[key].mime),
          type: values.videofile[key].mime,
        });
      }
      return null;
    });
  }
  let tags = values.tags ? values.tags.map(tag => tag.id) : [];
  let categories = values.categories.map(category => category.id);
  let Variants = values.product_variants.map(v => {
    let totalQuantity = 0;
    let variantQuantity = v.variant_quantity.map(vq => {
      totalQuantity = parseInt(totalQuantity) + parseInt(vq.quantity);
      return {
        ...vq,
        warehouse_id: vq.warehouse.id,
      };
    });
    return {
      ...v,
      total_quantity: totalQuantity,
      variant_quantity: variantQuantity,
    };
  });
  data.append('workspace_id', workspaceId.toString());
  data.append('category_ids', JSON.stringify(categories));
  data.append('name', values.productName);
  data.append('description', values.description);
  data.append('code', values.productCode);
  data.append('price', values.price);
  data.append('tag_ids', JSON.stringify(tags));
  data.append(
    'preference',
    values.preference && values.preference.id.toString(),
  );
  data.append('product_variants', JSON.stringify(Variants));

  return instance
    .post('/products', data, token)
    .then(response => {
      setLoading(false);

      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const data = response.data;
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      setLoading(false);

      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {CreateProduct};

const getAuthHeader = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          const bearerToken = {
            headers: {
              Authorization: 'Bearer ' + res,
              'Content-type': 'multipart/form-data',
              Accept: 'application/json',
            },
          };
          resolve(bearerToken);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });

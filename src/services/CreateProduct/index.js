import {handleConvert} from '../../components/Story/helper';
import {getAuthHeader} from '../../config/authSettings';
import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';

const CreateProduct = async (values, workspaceId) => {
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
        data.append('avatar_new', JSON.stringify(values.images[key]));
      }
      return null;
    });
  }
  if (values.mobileImages && values.mobileImages.length > 0) {
    Object.keys(values.mobileImages).map((key, index) => {
      if (values.mobileImages[key]) {
        data.append('mobile_view', values.mobileImages[key]);
      }
      return null;
    });
  }
  if (values.audioFile && values.audioFile.length > 0) {
    Object.keys(values.audioFile).map((key, index) => {
      if (values.audioFile[key]) {
        data.append('audio_file', values.audioFile[key]);
      }
      return null;
    });
  }
  if (values.videoFile && values.videoFile.length > 0) {
    Object.keys(values.videoFile).map((key, index) => {
      if (values.videoFile[key]) {
        data.append('video_file', values.videoFile[key]);
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

  let ok = {workspace_id: workspaceId.toString()};
  ok = {...ok, category_ids: JSON.stringify(categories)};
  ok = {...ok, name: values.productName};
  ok = {...ok, description: values.description};
  ok = {...ok, code: values.productCode};
  ok = {...ok, price: values.price};
  ok = {...ok, tag_ids: JSON.stringify(tags)};
  ok = {...ok, preference: values.preference && values.preference.id};
  ok = {...ok, product_variants: JSON.stringify(Variants)};
  if (values.videoFile && values.videoFile.length > 0) {
    Object.keys(values.videoFile).map((key, index) => {
      if (values.videoFile[key]) {
        ok = {...ok, video_file: values.videoFile[key]};
      }
      return null;
    });
  }
  if (values.audioFile && values.audioFile.length > 0) {
    Object.keys(values.audioFile).map((key, index) => {
      if (values.audioFile[key]) {
        ok = {...ok, audio_file: values.audioFile[key]};
      }
      return null;
    });
  }
  if (values.images && values.images.length > 0) {
    Object.keys(values.images).map(async (key, index) => {
      if (values.images[key]) {
        console.log('before convert', values.images[key].path);

        // const resp = await handleConvert(values.images[key].path);
        console.log(
          `data:${values.images[key].mime};base64,${values.images[key].data}`,
          'resp',
          // typeof resp,
        );
        ok = {
          ...ok,
          avatar_new: `data:${values.images[key].mime};base64,${values.images[key].data}`,
        };
      }
      return null;
    });
  }
  if (values.mobileImages && values.mobileImages.length > 0) {
    Object.keys(values.mobileImages).map((key, index) => {
      if (values.mobileImages[key]) {
        ok = {...ok, mobile_view: values.mobileImages[key]};
      }
      return null;
    });
  }
  console.log(values, ' before request data ', data);
  return instance
    .post('/products', data, token)
    .then(response => {
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
        console.log(response);
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err, 'errrrrror');
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {CreateProduct};

import {convertImageTobase64} from '../../../utils/urlParser';
import moment from 'moment';
import * as Yup from 'yup';
// import {DATE, POST_DATE_TIME} from '../../util';
import {
  SaveStories,
  SaveScheduleStories,
} from '../../../services/SocialProfiles';
import {showMessage} from 'react-native-flash-message';
import * as Constants from '../Constants';
import {POST_DATE_TIME, DATE} from '../Constants';
import {FetchProductImages} from '../../../services/Instagram';
import {FetchFilterProducts} from '../../../services/Products';
import {flattenDeep, min, uniqBy} from 'lodash';
import {Routes} from '../../../utils/constants';

let base64Images;
export const handleConvert = async imageUrl => {
  base64Images = [];
  for (const image of imageUrl) {
    const base64 = await convertImageTobase64(image);
    base64Images.push(base64);
  }
  return base64Images;
};

export const StorySchema = Yup.object().shape({
  date: Yup.string().when('formType', {
    is: formType => formType && formType === 'custom', //just an e.g. you can return a function
    then: Yup.string()
      .required('validation.date.required')
      .test('date', 'validation.schedule.message', date => {
        let result = true;
        if (date) {
          result = moment(date).isBefore(moment());
          if (date >= moment().format('YYYY-MM-DDTHH:mm')) {
            result = true;
          } else {
            result = false;
          }
        }
        return result;
      }),
    otherwise: Yup.string().optional(),
  }),
});

export const initialValues = {
  userId: '',
  type: 'facebook',
  formType: 'custom',
  pageName: '',
  pagelogo: '',
  workspaceId: '',
  date: '',
  pageId: '',
  accessToken: '',
  selectedImagesArr: [],
  deletedNumberArr: [],
  imagesArr: [],
  carousel: [],
  products: [],
  imagesLoading: false,
  selectionType: {id: 'product', name: 'Product'},
  isScheduled: false,
  productIds: [],
  categoryId: null,
  image: [],
  tagId: null,
  isPreview: false,
  isPreviewLoading: false,
  slotsLoading: false,
  startDate: moment().format(DATE),
  endDate: moment().format(DATE),
  slots: [],
  noOfPosts: null,
  criteria: null,
  loading: false,
};

export const onClickLoadMedia = async (values, setFieldValue, workspaceId) => {
  setFieldValue(Constants.IMG_ARR, []);
  setFieldValue(Constants.SELECTED_IMG_ARR, []);
  setFieldValue(Constants.DELETED_NUM_ARR, []);
  setFieldValue(Constants.CAROUSEL, []);
  if (
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.PRODUCT
  ) {
    setFieldValue(Constants.IMG_LOADING, true);
    const ids = values.productIds.map(product => product.id);
    const resp = await FetchProductImages(ids, workspaceId);
    if (resp.status === 200) {
      const newArr = resp.data
        .filter(
          k =>
            k.image_type !== Constants.AUDIO &&
            k.image_type !== Constants.VIDEO,
        )
        .map(d => {
          return {
            ...d,
            selectedImageNumber: '',
            selected: false,
          };
        });
      setFieldValue(Constants.IMG_ARR, newArr);
    } else {
      setFieldValue(Constants.IMG_ARR, []);
    }
    setFieldValue(Constants.IMG_LOADING, false);
  } else if (
    workspaceId &&
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.CATEGORY
  ) {
    setFieldValue(Constants.IMG_LOADING, true);
    const categoryids =
      values && values.categoryId && values.categoryId.length > 0
        ? values.categoryId.map(category => category.id)
        : null;
    const resp = await FetchFilterProducts({
      category: categoryids,
      tag: null,
      preference: null,
      workspaceId: workspaceId ? workspaceId : null,
    });
    if (resp.status === 200) {
      setFieldValue(Constants.IMG_ARR, getImagesArr(resp.data));
    } else {
      console.log('else return for category');
      setFieldValue(Constants.IMG_ARR, []);
    }
    setFieldValue(Constants.IMG_LOADING, false);
  } else {
    setFieldValue(Constants.IMG_LOADING, true);
    const tagids =
      values && values.tagId && values.tagId.length > 0
        ? values.tagId.map(tag => tag.id)
        : null;
    const resp = await FetchFilterProducts({
      category: null,
      tag: tagids,
      preference: null,
      workspaceId: workspaceId ? workspaceId : null,
    });
    if (resp.status === 200) {
      setFieldValue(Constants.IMG_ARR, getImagesArr(resp.data));
    } else {
      console.log('else return for');
      setFieldValue(Constants.IMG_ARR, []);
    }
    setFieldValue(Constants.IMG_LOADING, false);
  }
};

const getImagesArr = respData => {
  const newArr = respData.map(d => {
    const productAttachments = d.product_attachments.filter(
      d => d.image_type !== Constants.AUDIO && d.image_type !== Constants.VIDEO,
    );
    return {
      name: d.name || '',
      description: d.description || '',
      code: d.code || '',
      price: d.price || 0,
      quantity: d.quantity || '',
      sale_price: d.sale_price || 0,
      product_attachments: productAttachments,
      discount_percent: Math.ceil(100 - (d.sale_price / d.price) * 100),
      web_url: d.web_url || '',
    };
  });
  const data = flattenDeep(
    newArr.map(d =>
      d.product_attachments.map(r => {
        return {
          ...r,
          name: d.name || '',
          description: d.description || '',
          code: d.code || '',
          price: d.price || '',
          quantity: d.quantity || '',
          sale_price: d.sale_price || '',
          discount_percent: d.discount_percent || 0,
          web_url: d.web_url || '',
        };
      }),
    ),
  );
  const result = data.map(d => {
    return {
      ...d,
      id: d.id,
      productId: d.product_id || '',
      image:
        d.image && d.image.url
          ? d.image.url
          : d.mobile_view && d.mobile_view.url
          ? d.mobile_view.url
          : '',
      thumb:
        d.image && d.image.thumb && d.image.thumb.url
          ? d.image.thumb.url
          : d.mobile_view && d.mobile_view.thumb && d.mobile_view.thumb.url
          ? d.mobile_view.thumb.url
          : '',
      selectedImageNumber: '',
      selected: false,
    };
  });
  return result;
};

export const saveStory = async (values, selectedImages, navigation) => {
  console.log(values, selectedImages, 'RAAAAAANNN CONSSSOLEEEE');
  if (values[Constants.FORM_TYPE] === Constants.CUSTOM) {
    let dateFormat = '';
    if (values.date) {
      dateFormat = moment(values.date).format(POST_DATE_TIME);
    }
    let formData = {
      type: values.type || '',
      pageName: values.pageName || '',
      pagelogo: values.pagelogo || '',
      workspaceId: values.workspaceId || '',
      pageId: values.pageId || '',
      accessToken: values.accessToken || '',
      carousel: selectedImages || [],
      productIds:
        values && values.productIds && values.productIds.length > 0
          ? values.productIds.map(product => {
              return {productId: product.id};
            })
          : [],
      userId: values.userId || '',
      shareAt: dateFormat,
    };
    const resp = await SaveStories(formData);
    console.log(resp, 'this is resp');
    if (resp.status === 200) {
      console.log(resp.status, 'this is status');
      showMessage({
        message: resp.message,
        description: 'Story Saved Successfully',
        type: 'success',
      });
      navigation.navigate(Routes.SHOWSTORY);
      // handles.resetForm();
      // closeStoryModal();
    } else {
      showMessage({
        message: resp.message,
        description: ' Story Not Saved',
        type: 'DANGER',
      });
    }
    // handles.setFieldValue('loading', false);
  } else {
    console.log(values);
    // handles.setFieldValue('loading', true);
    const stories = values.slots.map(s => {
      return {
        type: values.type || '',
        pageName: values.pageName || '',
        pagelogo: values.pagelogo || '',
        workspaceId: values.workspaceId.toString() || '',
        pageId: values.pageId || '',
        accessToken: values.accessToken || '',
        userId: values.userId || '',
        images: s.images.map(i => i.url) || [],
        productIds: s.products || [],
        shareAt: s.date,
      };
    });
    console.log(stories);
    const resp = await SaveScheduleStories(stories);
    if (resp.status === 200) {
      showMessage({
        message: resp.message,
        description: 'Story Schedule Saved Successfully',
        type: 'success',
      });
      // handles.resetForm();
      // closeStoryModal();
    } else {
      showMessage({
        message: resp.message,
        description: ' Story Not Scheduled ',
        type: 'DANGER',
      });
    }
    // handles.setFieldValue('loading', false);
  }
};

/* eslint-disable no-shadow */
import {convertImageTobase64} from '../../utils/urlParser';
import moment from 'moment';
import * as Yup from 'yup';
import * as Constants from '../../scenes/SocialMedia/Constants';
import {POST_DATE_TIME, DATE} from '../../scenes/SocialMedia/Constants';
import {FetchProductImages} from '../../services/Instagram';
import {FetchFilterProducts} from '../../services/Products';
import {flattenDeep} from 'lodash';

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

export const FacebookPostTimes = [
  {
    id: 1,
    count: 1,
    name: '1 Story in a day',
    label: '1 Story in a day',
    value: '1 Story in a day',
    day: 1,
  },
  {
    id: 2,
    count: 2,
    name: '2 Stories in a day',
    label: '2 Stories in a day',
    value: '2 Stories in a day',
    day: 1,
  },
  {
    id: 3,
    count: 5,
    name: '5 Stories in a day',
    label: '5 Stories in a day',
    value: '5 Stories in a day',
    day: 1,
  },
  {
    id: 4,
    count: 10,
    name: '10 Stories in a day',
    label: '10 Stories in a day',
    value: '10 Stories in a day',
    day: 1,
  },
  {
    id: 5,
    count: 1,
    name: '7 Stories in a week',
    label: '7 Stories in a week',
    value: '7 Stories in a week',
    day: 7,
  },
  {
    id: 6,
    count: 2,
    name: '14 Stories in a week',
    label: '14 Stories in a week',
    value: '14 Stories in a week',
    day: 7,
  },
  {
    id: 7,
    count: 4,
    name: '28 Stories in a week',
    label: '28 Stories in a week',
    value: '28 Stories in a week',
    day: 7,
  },
  {
    id: 8,
    count: 1,
    name: '30 Stories in a month',
    label: '30 Stories in a month',
    value: '30 Stories in a month',
    day: 30,
  },
  {
    id: 9,
    count: 2,
    name: '60 Stories in a month',
    label: '60 Stories in a month',
    value: '60 Stories in a month',
    day: 30,
  },
];
export const InstagramPostTimes = [
  {
    id: 1,
    count: 1,
    name: '1 Story in a day',
    label: '1 Story in a day',
    value: '1 Story in a day',
    day: 1,
  },
  {
    id: 2,
    count: 3,
    name: '3 Stories in a day',
    label: '3 Stories in a day',
    value: '3 Stories in a day',
    day: 1,
  },
  {
    id: 3,
    count: 6,
    name: '6 Stories in a day',
    label: '6 Stories in a day',
    value: '6 Stories in a day',
    day: 1,
  },
  {
    id: 4,
    count: 9,
    name: '9 Stories in a day',
    label: '9 Stories in a day',
    value: '9 Stories in a day',
    day: 1,
  },
  {
    id: 5,
    count: 3,
    name: '15 Stories in a week',
    label: '15 Stories in a week',
    value: '15 Stories in a week',
    day: 7,
  },
  {
    id: 6,
    count: 6,
    name: '30 Stories in a week',
    value: '30 Stories in a week',
    label: '30 Stories in a week',
    day: 7,
  },
  {
    id: 7,
    count: 3,
    name: '90 Stories in a month',
    label: '90 Stories in a month',
    value: '90 Stories in a month',
    day: 30,
  },
  {
    id: 8,
    count: 6,
    name: '150 Stories in a month',
    label: '150 Stories in a month',
    value: '150 Stories in a month',
    day: 30,
  },
];

export const createDate = value => {
  return moment(value).format(DATE);
};

export const Criterias = [
  {
    id: 'preference',
    name: 'Preference',
    label: 'Preference',
    value: 'Preference',
  },
  {id: 'quantity', name: 'Quantity', label: 'Quantity', value: 'Quantity'},
];

export const createEndDate = (start, day) => {
  return moment(start)
    .add(day - 1, 'days')
    .format(Constants.DATE);
};

export const getPostTimes = profileType => {
  return profileType === Constants.FACEBOOK
    ? FacebookPostTimes
    : InstagramPostTimes;
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
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.CATEGORY
  ) {
    setFieldValue(Constants.IMG_LOADING, true);
    const resp = await FetchFilterProducts({
      category: values.categoryId,
      tag: null,
      preference: null,
      workspaceId: workspaceId,
    });
    if (resp.status === 200) {
      setFieldValue(Constants.IMG_ARR, getImagesArr(resp.data));
    } else {
      setFieldValue(Constants.IMG_ARR, []);
    }
    setFieldValue(Constants.IMG_LOADING, false);
  } else {
    setFieldValue(Constants.IMG_LOADING, true);
    const resp = await FetchFilterProducts({
      category: null,
      tag: values.tagId,
      preference: null,
      workspaceId: workspaceId,
    });
    if (resp.status === 200) {
      setFieldValue(Constants.IMG_ARR, getImagesArr(resp.data));
    } else {
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

export const previewHelper = (currentProfile, publishedStories, userId) => {
  const ok = publishedStories.map(i => {
    return {
      user_id: userId,
      user_image:
        currentProfile &&
        currentProfile.page_icon &&
        currentProfile.page_icon.thumb &&
        currentProfile.page_icon.thumb.url
          ? currentProfile.page_icon.thumb.url
          : currentProfile.page_icon.url,
      user_name:
        currentProfile && currentProfile.name
          ? currentProfile.name
          : currentProfile.username,
      date: moment(i && i.shareAt).format('YYYY-MM-DD hh:mm A'),
      stories:
        i &&
        i.images &&
        i.images.length > 0 &&
        i.images.map((url, index) => {
          return {
            story_id: index,
            story_image: url
              ? url
              : 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
            swipeText: 'Custom swipe text for this story',
            onPress: () => console.log('story 1 swiped'),
          };
        }),
    };
  });
  return ok;
};
export const previewHelper2 = (item, currentProfile, userId) => {
  console.log(item, ' =============== item', currentProfile, userId);
  // const ok = {
  //   user_id: userId,
  //   user_image:
  //     currentProfile &&
  //     currentProfile.page_icon &&
  //     currentProfile.page_icon.thumb &&
  //     currentProfile.page_icon.thumb.url
  //       ? currentProfile.page_icon.thumb.url
  //       : currentProfile.page_icon.url,
  //   user_name:
  //     currentProfile && currentProfile.name
  //       ? currentProfile.name
  //       : currentProfile.username,
  //   date: moment(item && item.shareAt).format('YYYY-MM-DD hh:mm A'),
  //   stories:
  //     item &&
  //     item.images &&
  //     item.images.length > 0 &&
  //     item.images.map((url, index) => {
  //       return {
  //         story_id: index,
  //         story_image: url
  //           ? url
  //           : 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
  //         swipeText: 'Custom swipe text for this story',
  //         onPress: () => console.log('story 1 swiped'),
  //       };
  //     }),
  // };

  // return ok;
};

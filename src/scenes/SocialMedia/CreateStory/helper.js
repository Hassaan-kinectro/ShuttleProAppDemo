import {convertImageTobase64} from '../../../utils/urlParser';
import moment from 'moment';
import * as Yup from 'yup';
// import {DATE, POST_DATE_TIME} from '../../util';
import {
  SaveStories,
  SaveScheduleStories,
  UpdateStories,
} from '../../../services/SocialProfiles';
import {showMessage} from 'react-native-flash-message';
import * as Constants from '../Constants';
import {POST_DATE_TIME, DATE} from '../Constants';
import {FetchProductImages} from '../../../services/Instagram';
import {FetchFilterProducts} from '../../../services/Products';
import {flattenDeep} from 'lodash';
import {Routes} from '../../../utils/constants';
import {getPostSlots} from '../../../services/Facebook';
import {StackActions} from '@react-navigation/native';
import {getUser} from '../../../config/authSettings';

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
  startDate: moment(new Date()).format(DATE),
  endDate: moment(new Date()).format(DATE),
  slots: [],
  noOfPosts: null,
  criteria: null,
  loading: false,
};

const modifyValues = (values, currentProfile) => {
  return {
    pageId: currentProfile.page_id,
    noOfPosts: values.noOfPosts.count,
    type: Constants.MULTIPLE,
    criteria: values.criteria.id,
    desTemplateId: '',
    startDate: values.startDate,
    endDate: values.endDate,
  };
};

const modifySlotsValues = (values, data) => {
  const rec = data.map(d => {
    const ids = [];
    const images = d.products.map(p => {
      ids.push({productId: p.id});
      const attachments =
        (p.product_attachments &&
          p.product_attachments.filter(a => a.image_type === 'default')) ||
        [];
      return {
        url:
          attachments &&
          attachments[0] &&
          attachments[0].image &&
          attachments[0].image.url
            ? attachments[0].image.url
            : '',
        header: {
          heading: (values && values.pageName) || '',
          subheading: moment().fromNow(),
          profileImage: (values && values.pagelogo) || '',
        },
      };
    });
    return {
      date: d.postTime,
      images: images,
      products: ids,
    };
  });
  return rec;
};
export const getPostAllSlots = async (
  values,
  currentProfile,
  setFieldValue,
  workspaceId,
) => {
  setFieldValue(Constants.SLOT_LOADING, true);
  const resp = await getPostSlots(
    modifyValues(values, currentProfile),
    workspaceId,
  );
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    console.log(resp.data, 'this is response');
    setFieldValue(Constants.SLOT_LOADING, false);
    setFieldValue(Constants._IS_PREVIEW, true);
    setFieldValue(
      Constants.SLOTS,
      modifySlotsValues(values, resp.data, setFieldValue),
    );
  } else {
    setFieldValue(Constants.SLOT_LOADING, false);
  }
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

export const updateStory = async (
  values,
  selectedImages,
  profile,
  Id,
  navigation,
) => {
  let dateFormat = '';
  if (values.date) {
    dateFormat = moment(values.date).format(POST_DATE_TIME);
  }
  let formData = {
    carousel: selectedImages || [],
    productIds:
      values && values.productIds && values.productIds.length > 0
        ? values.productIds.map(product => {
            return {productId: product.id};
          })
        : [],
    shareAt: dateFormat,
  };

  const resp = await UpdateStories(Id, formData);
  if (resp.status === 200) {
    showMessage({
      message: resp.message,
      description: 'Story Updated Successfully',
      type: 'success',
    });
    navigation.dispatch(
      StackActions.replace(Routes.SHOWSTORY, {
        profile: profile,
      }),
    );
    // handles.resetForm();
    // closeStoryModal();
  } else {
    showMessage({
      message: resp.message,
      description: ' Story Not Updated',
      type: 'DANGER',
    });
  }
  // handles.setFieldValue('loading', false);
};

export const saveStory = async (
  profile,
  values,
  selectedImages,
  navigation,
  selectedValue,
) => {
  if (selectedValue === Constants.CUSTOM) {
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
      userId: values && values.userId ? values.userId : null,
      shareAt: dateFormat,
    };
    console.log(formData, 'formData is here');
    const resp = await SaveStories(formData);

    if (resp.status === 200) {
      showMessage({
        message: resp.message,
        description: 'Story Saved Successfully',
        type: 'success',
      });
      navigation.dispatch(
        StackActions.replace(Routes.SHOWSTORY, {
          profile: profile,
        }),
      );
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

    const resp = await SaveScheduleStories(stories);
    if (resp.status === 200) {
      showMessage({
        message: resp.message,
        description: 'Story Schedule Saved Successfully',
        type: 'success',
      });
      navigation.dispatch(StackActions.replace(Routes.SHOWSTORY));
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

export const previewHelper = (values, currentProfile, userId) => {
  const ok = values.map(i => {
    console.log(
      moment(i && i.date).format('YYYY-MM-DD hh:mm A'),
      'this is i',
      i,
    );
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
      date: moment(i && i.date).format('YYYY-MM-DD hh:mm A'),
      stories:
        i &&
        i.images &&
        i.images.length > 0 &&
        i.images.map((url, index) => {
          return {
            story_id: index,
            story_image:
              url && url.url
                ? url.url
                : 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
            swipeText: 'Custom swipe text for this story',
            onPress: () => console.log('story 1 swiped'),
          };
        }),
    };
  });
  return ok;
};

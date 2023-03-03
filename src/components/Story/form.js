/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React from 'react';
import {View} from 'react-native';
import {Text, GlobalStyle, Mixins, Colors} from '../../styles';
import {useTheme} from '@react-navigation/native';
import DropDownPicker from '../DropDown';
import * as Constants from '../../scenes/SocialMedia/Constants';
import AIcon from 'react-native-vector-icons/AntDesign';
import DatePickerField from '../DateTimePicker';
import {selectionTypes} from '../../scenes/SocialMedia/helper';
const dropDownMaxHeight = 150;
const Form = ({
  storyData,
  values,
  setFieldValue,
  products,
  tags,
  categories,
  currentProfile,
  type,
  userId,
}) => {
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const [nameVisible, setNameVisibility] = React.useState(false);
  const [productVisible, setProductVisibility] = React.useState(false);
  const [categoryVisible, setCategoryVisible] = React.useState(false);
  const [tagVisible, setTagVisible] = React.useState(false);

  const changeVisibility = () => {
    setNameVisibility(false);
    setProductVisibility(false);
    setCategoryVisible(false);
    setTagVisible(false);
  };

  React.useEffect(() => {
    if (storyData && currentProfile && setFieldValue && setFieldValue) {
      setFieldValue(
        Constants._PAGE_ID,
        (currentProfile && currentProfile.page_id) || '',
      );
      setFieldValue(
        Constants._PAGE_NAME,
        (currentProfile && currentProfile.name) || '',
      );
      setFieldValue(
        Constants._PAGE_LOGO_INSTA,
        (currentProfile &&
          currentProfile.page_icon &&
          currentProfile.page_icon.url) ||
          '',
      );
      setFieldValue(
        Constants._ACCESS_TOKEN,
        (currentProfile && currentProfile.access_token) || '',
      );
      setFieldValue(
        Constants._WORKSPACEID,
        (currentProfile && currentProfile.workspace_id) || '',
      );
      setFieldValue(
        Constants.STORY_TYPE,
        (currentProfile && currentProfile.profile_type) || '',
      );
    }
  }, [currentProfile, storyData]);
  React.useEffect(() => {
    if (currentProfile && setFieldValue && setFieldValue) {
      setFieldValue(
        Constants._PAGE_ID,
        (currentProfile && currentProfile.page_id) || '',
      );
      setFieldValue(
        Constants._PAGE_NAME,
        (currentProfile && currentProfile.name) || '',
      );
      setFieldValue(
        Constants._PAGE_LOGO_INSTA,
        (currentProfile &&
          currentProfile.page_icon &&
          currentProfile.page_icon.url) ||
          '',
      );
      setFieldValue(
        Constants._ACCESS_TOKEN,
        (currentProfile && currentProfile.access_token) || '',
      );
      setFieldValue(
        Constants._WORKSPACEID,
        (currentProfile && currentProfile.workspace_id) || '',
      );
      setFieldValue(
        Constants.STORY_TYPE,
        (currentProfile && currentProfile.profile_type) || '',
      );
    }
  }, [currentProfile]);

  React.useEffect(() => {
    if (
      products &&
      products.data &&
      products.data.length > 0 &&
      storyData &&
      storyData.productIds &&
      storyData.productIds.length > 0
    ) {
      const productId = storyData.productIds.map(product =>
        product.productId.toString(),
      );
      setFieldValue(
        Constants.PRODUCT_ID,
        products.data.filter(i => {
          return productId.includes(i.id.toString());
        }),
      );
    } else {
      setFieldValue(Constants.PRODUCT_ID, []);
    }
  }, [storyData, products]);

  React.useEffect(() => {
    if (storyData && storyData.shareAt) {
      setFieldValue(Constants._DATE, storyData.shareAt);
    } else {
      setFieldValue(Constants._DATE, '');
    }
  }, [storyData]);

  React.useEffect(() => {
    if (userId && userId && setFieldValue && setFieldValue) {
      setFieldValue('userId', userId || '');
    }
  }, [userId]);

  return (
    <>
      <DropDownPicker
        items={selectionTypes}
        defaultValue={values.selectionTypes}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        dropDownMaxHeight={dropDownMaxHeight}
        isVisible={nameVisible}
        onOpen={() => {
          changeVisibility();
          setNameVisibility(true);
        }}
        onClose={() => setNameVisibility(false)}
        placeholder="Product"
        containerStyle={Styles.containerStyle}
        style={Styles.dropDownContainerStyle}
        itemStyle={Styles.itemStyle}
        arrowColor={colors.button}
        labelStyle={Styles.labelStyle}
        activeLabelStyle={Styles.activeLabelStyle}
        selectedLabelStyle={Styles.activeLabelStyle}
        placeholderStyle={Styles.placeholderStyle}
        dropDownStyle={Styles.dropDownContainerStyle}
        searchablePlaceholderTextColor={colors.placeholder}
        searchableStyle={Styles.searchableStyle}
        onChangeItem={value => {
          setFieldValue(Constants.SELECTION_TYPE, value);
          setFieldValue(Constants.IMG_ARR, []);
          setFieldValue(Constants.SELECTED_IMG_ARR, []);
          setFieldValue(Constants.DELETED_NUM_ARR, []);
          setFieldValue(Constants.PRODUCT_ID, []);
          setFieldValue(Constants.CAROUSEL, []);
          setFieldValue(Constants.CATEGORY_ID, null);
          setFieldValue(Constants.TAG_ID, null);
        }}
        zIndex={50010}
      />

      {values.selectionType &&
        values.selectionType.id &&
        values.selectionType.id === Constants.PRODUCT && (
          <>
            <DropDownPicker
              items={products.data}
              defaultValue={
                values && values.productIds && values.productIds.length > 0
                  ? values.productIds
                  : []
              }
              scrollViewProps={{
                keyboardShouldPersistTaps: 'always',
              }}
              dropDownMaxHeight={dropDownMaxHeight}
              isVisible={productVisible}
              multiple={true}
              onOpen={() => {
                changeVisibility();
                setProductVisibility(true);
              }}
              onClose={() => setProductVisibility(false)}
              min={0}
              max={10}
              multipleText="%d product selected."
              placeholder="Select Product"
              containerStyle={Styles.containerStyle}
              style={Styles.dropDownContainerStyle}
              itemStyle={Styles.itemStyle}
              arrowColor={colors.button}
              labelStyle={Styles.labelStyle}
              activeLabelStyle={Styles.activeLabelStyle}
              selectedLabelStyle={Styles.activeLabelStyle}
              placeholderStyle={Styles.placeholderStyle}
              dropDownStyle={Styles.dropDownContainerStyle}
              searchablePlaceholderTextColor={colors.placeholder}
              searchableStyle={Styles.searchableStyle}
              onChangeItem={value => {
                if (value) {
                  setFieldValue(Constants.PRODUCT_ID, value);
                } else {
                  setFieldValue(Constants.PRODUCT_ID, value);
                  setFieldValue(Constants.IMG_ARR, []);
                  setFieldValue(Constants.SELECTED_IMG_ARR, []);
                  setFieldValue(Constants.DELETED_NUM_ARR, []);
                }
              }}
              zIndex={50008}
            />
          </>
        )}
      {values.selectionType &&
        values.selectionType.id &&
        values.selectionType.id === Constants.CATEGORY && (
          <>
            <DropDownPicker
              items={categories.data}
              defaultValue={[]}
              scrollViewProps={{
                keyboardShouldPersistTaps: 'always',
              }}
              dropDownMaxHeight={dropDownMaxHeight}
              isVisible={categoryVisible}
              onOpen={() => {
                changeVisibility();
                setCategoryVisible(true);
              }}
              multiple={true}
              min={0}
              max={10}
              multipleText="%d category selected."
              onClose={() => setCategoryVisible(false)}
              placeholder="Select Category"
              containerStyle={Styles.containerStyle}
              style={Styles.dropDownContainerStyle}
              itemStyle={Styles.itemStyle}
              arrowColor={colors.button}
              labelStyle={Styles.labelStyle}
              activeLabelStyle={Styles.activeLabelStyle}
              selectedLabelStyle={Styles.activeLabelStyle}
              placeholderStyle={Styles.placeholderStyle}
              dropDownStyle={Styles.dropDownContainerStyle}
              searchablePlaceholderTextColor={colors.placeholder}
              searchableStyle={Styles.searchableStyle}
              onChangeItem={value => {
                if (value) {
                  setFieldValue(Constants.CATEGORY_ID, value);
                } else {
                  setFieldValue(Constants.CATEGORY_ID, value);
                  setFieldValue(Constants.IMG_ARR, []);
                  setFieldValue(Constants.SELECTED_IMG_ARR, []);
                  setFieldValue(Constants.DELETED_NUM_ARR, []);
                }
              }}
              zIndex={50005}
            />
          </>
        )}
      {values.selectionType &&
        values.selectionType.id &&
        values.selectionType.id === Constants.TAG && (
          <>
            <DropDownPicker
              items={tags.data}
              defaultValue={[]}
              scrollViewProps={{
                keyboardShouldPersistTaps: 'always',
              }}
              dropDownMaxHeight={dropDownMaxHeight}
              isVisible={tagVisible}
              onOpen={() => {
                changeVisibility();
                setTagVisible(true);
              }}
              onClose={() => setTagVisible(false)}
              placeholder="Select Tags"
              multiple={true}
              min={0}
              max={10}
              multipleText="%d tag selected."
              containerStyle={Styles.containerStyle}
              style={Styles.dropDownContainerStyle}
              itemStyle={Styles.itemStyle}
              arrowColor={colors.button}
              labelStyle={Styles.labelStyle}
              activeLabelStyle={Styles.activeLabelStyle}
              selectedLabelStyle={Styles.activeLabelStyle}
              placeholderStyle={Styles.placeholderStyle}
              dropDownStyle={Styles.dropDownContainerStyle}
              searchablePlaceholderTextColor={colors.placeholder}
              searchableStyle={Styles.searchableStyle}
              onChangeItem={value => {
                if (value) {
                  setFieldValue(Constants.TAG_ID, value);
                } else {
                  setFieldValue(Constants.TAG_ID, value);
                  setFieldValue(Constants.IMG_ARR, []);
                  setFieldValue(Constants.SELECTED_IMG_ARR, []);
                  setFieldValue(Constants.DELETED_NUM_ARR, []);
                }
              }}
              zIndex={50002}
            />
          </>
        )}
      <View>
        <DatePickerField
          style={Styles.picker}
          date={values.date}
          mode="datetime"
          placeholder="Select Notification Date"
          confirmBtnText="OK"
          cancelBtnText="CANCEL"
          format="YYYY-MM-DD HH:mm"
          onDateChange={date => {
            setFieldValue(Constants._DATE, date);
          }}
          iconComponent={
            <AIcon
              name="calendar"
              color={colors.button}
              size={22}
              style={[Styles.iconComponent]}
            />
          }
          customStyles={{
            placeholderText: Styles.dateFont,
            dateInput: [Styles.datePickerStyle],
            dateText: Styles.dateFont,
            btnTextConfirm: {
              color: Colors.WHITE,
            },
            btnTextCancel: {
              color: Colors.WHITE,
            },
            datePickerCon: {
              backgroundColor: 'transparent',
            },
          }}
        />
      </View>
    </>
  );
};
export default Form;

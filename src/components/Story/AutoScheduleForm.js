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
import {getPostTimes, createEndDate, Criterias, createDate} from './helper';
import {FONT_FAMILY} from '../../utils/constants';
const dropDownMaxHeight = 150;
const AutoScheduleForm = ({values, setFieldValue, currentProfile, userId}) => {
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const [noOfStories, setNoOfStories] = React.useState(false);
  const [criteriaVisible, setCriteriaVisibility] = React.useState(false);

  const changeVisibility = () => {
    setNoOfStories(false);
    setCriteriaVisibility(false);
  };

  React.useEffect(() => {
    if (userId && userId && setFieldValue && setFieldValue) {
      setFieldValue('userId', userId || '');
    }
  }, [userId]);

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

  return (
    <>
      <DropDownPicker
        items={getPostTimes(values[Constants.TYPE])}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        dropDownMaxHeight={dropDownMaxHeight}
        isVisible={noOfStories}
        onOpen={() => {
          changeVisibility();
          setNoOfStories(true);
        }}
        onClose={() => setNoOfStories(false)}
        placeholder="No.of stories"
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
          setFieldValue(
            Constants.ENDDATE,
            createEndDate(values[Constants.STARTDATE], value.day),
          );
          setFieldValue(Constants.NO_OF_POSTS, value);
        }}
        zIndex={50010}
      />
      <DropDownPicker
        items={Criterias}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        dropDownMaxHeight={dropDownMaxHeight}
        isVisible={criteriaVisible}
        onOpen={() => {
          changeVisibility();
          setCriteriaVisibility(true);
        }}
        onClose={() => setCriteriaVisibility(false)}
        placeholder="Select Criteria "
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
          console.log(value, 'this is the selected Critera');
          setFieldValue(Constants.CRITERIA, value);
        }}
        zIndex={50008}
      />
      <Text
        size={Mixins.scaleFont(12)}
        fontFamily={FONT_FAMILY.SEMI_BOLD}
        style={{marginLeft: 10}}>
        Start Date
      </Text>
      <DatePickerField
        style={Styles.picker}
        date={values.startDate}
        mode="datetime"
        placeholder="Start Date"
        confirmBtnText="OK"
        cancelBtnText="CANCEL"
        format="YYYY-MM-DD"
        onDateChange={newValue => {
          console.log(newValue, 'this is new value start');
          setFieldValue(
            Constants.ENDDATE,
            values[Constants.NO_OF_POSTS] && values[Constants.NO_OF_POSTS].day
              ? createEndDate(
                  createDate(newValue) || '',
                  values[Constants.NO_OF_POSTS].day,
                )
              : '',
          );
          setFieldValue(Constants.STARTDATE, createDate(newValue));
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
      {values.noOfPosts && values.noOfPosts.id && (
        <>
          <Text
            size={Mixins.scaleFont(12)}
            fontFamily={FONT_FAMILY.SEMI_BOLD}
            style={{marginLeft: 10, marginTop: 10}}>
            End Date
          </Text>
          <DatePickerField
            style={Styles.picker}
            date={values.endDate}
            mode="datetime"
            placeholder="End Date"
            confirmBtnText="OK"
            cancelBtnText="CANCEL"
            format="YYYY-MM-DD"
            onDateChange={newValue => {
              console.log(newValue, 'this is new value end');
              setFieldValue(Constants.ENDDATE, createDate(newValue));
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
        </>
      )}
    </>
  );
};
export default AutoScheduleForm;

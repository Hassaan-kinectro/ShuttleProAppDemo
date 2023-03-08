import React, {useState, useEffect, useRef} from 'react';
import MModal from 'react-native-modal';
import {TouchableOpacity, View, ScrollView, StyleSheet} from 'react-native';
import {Colors, Text, GlobalStyle} from '../../styles';
import {deviceHeight} from '../../utils/orientation';
import {isNull} from 'lodash';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlashMessage from 'react-native-flash-message';
import DropDownPicker from '../DropDown';
import DateTimePicker from '../DateTimePicker';
import {useTheme} from '@react-navigation/native';
const FilterTag = filter => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  let name = filter.value;
  if (filter.data && filter.data.length > 0) {
    const aa = filter.data.find(f => f.id === filter.value);
    if (aa) {
      name = aa.label ? aa.label : filter.value;
    }
  }
  return (
    <View
      style={[
        Styles.alignItemsCenter,
        Styles.justifyContentCenter,
        Styles.flexDirectionRow,
        styles.filterContainer,
      ]}>
      {filter.icon && (
        <MIcon
          name={filter.icon}
          size={20}
          color="#fff"
          style={Styles.pR10}
          onPress={filter.onclick}
        />
      )}
      <Text size={13} color="#fff">
        {name}
      </Text>
      <MIcon
        name="close-circle-outline"
        size={24}
        color={Colors.DANGER}
        style={Styles.pL10}
        onPress={filter.onclick}
      />
    </View>
  );
};
const OrdersFilterModal = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const headerHeight = 80;
  let flashBox = useRef(null);
  useEffect(() => {
    if (props.filter) {
      if (props.filter.startDate) {
        setStartDate(props.filter.startDate);
      }
      if (props.filter.endDate) {
        setEndDate(props.filter.endDate);
      }
      if (props.filter.status_type && props.statusTypes) {
        const al = props.statusTypes.find(
          s => s.value === props.filter.status_type,
        );
        setStatus((al && al.value) || null);
      }
    }
  }, [props.filter, props.statusTypes]);
  const onModalClose = () => {
    props.setVisibility(false);
  };
  const flash = () => {
    flashBox.showMessage({
      message: '',
      description: 'ssds',
      type: 'danger',
    });
  };
  const submitForm = () => {
    setFilterObject();
    onModalClose();
  };
  const setFilterObject = (only = false, state = '') => {
    const filter = {};
    if (!isNull(status) && state !== 'status') {
      filter.status_type = status;
    }
    if (!isNull(startDate) && state !== 'startDate') {
      filter.startDate = startDate;
    }
    if (!isNull(endDate) && state !== 'endDate') {
      filter.endDate = endDate;
    }
    props.getFilter(1, filter, true);
  };

  return (
    <>
      <MModal
        isVisible={props.visible}
        animationOutTiming={100}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        backdropOpacity={0}
        style={{
          margin: 0,
          marginTop: 0,
          height: deviceHeight,
          paddingLeft: 80,
        }}
        onBackdropPress={onModalClose}
        onSwipeComplete={onModalClose}
        onBackButtonPress={onModalClose}
        swipeThreshold={150}
        deviceHeight={deviceHeight}
        swipeDirection={['right']}>
        <View style={[Styles.flex, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={onModalClose}
            style={{
              height: headerHeight / 2,
              backgroundColor: Colors.TRANSPARENT,
            }}
          />
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={[
              {
                backgroundColor: colors.background,
                padding: 10,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                Styles.flex,
                {
                  minHeight: deviceHeight - headerHeight - 50,
                },
              ]}>
              <>
                <TouchableOpacity
                  onPress={onModalClose}
                  style={[
                    {
                      height: 30,
                    },
                  ]}>
                  <MIcon name="close" size={24} color={Colors.DANGER} />
                </TouchableOpacity>
                {!isNull(status) || !isNull(startDate) || !isNull(endDate) ? (
                  <>
                    <View
                      style={[
                        Styles.flexDirectionRow,
                        Styles.alignItemsCenter,
                        {
                          flexWrap: 'wrap',
                        },
                      ]}>
                      {!isNull(status) && (
                        <FilterTag
                          value={status}
                          data={props.statusTypes}
                          onclick={() => {
                            setStatus(null);
                            setFilterObject(true, 'status');
                          }}
                        />
                      )}
                      {!isNull(startDate) && (
                        <FilterTag
                          value={startDate}
                          icon={'calendar-arrow-right'}
                          onclick={() => {
                            setStartDate(null);
                            setFilterObject(true, 'startDate');
                          }}
                        />
                      )}
                      {!isNull(endDate) && (
                        <FilterTag
                          value={endDate}
                          icon={'calendar-arrow-left'}
                          onclick={() => {
                            setEndDate(null);
                            setFilterObject(true, 'endDate');
                          }}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={submitForm}
                      style={[
                        Styles.alignItemsCenter,
                        Styles.justifyContentCenter,
                        styles.button,
                      ]}>
                      <Text size={13} color="#fff">
                        Apply Filter
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View
                    onPress={submitForm}
                    style={[
                      Styles.alignItemsCenter,
                      Styles.justifyContentCenter,
                      styles.button,
                    ]}>
                    <Text size={13} color="#fff">
                      Apply Filter
                    </Text>
                  </View>
                )}

                <DateTimePicker
                  style={Styles.picker}
                  date={startDate || null}
                  mode="date"
                  maxDate={new Date()}
                  placeholder="Select Start Date Time"
                  confirmBtnText="OK"
                  cancelBtnText="CANCEL"
                  format="YYYY-MM-DD"
                  onDateChange={date => {
                    setStartDate(date);
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
                      backgroundColor: colors.boxColor,
                    },
                  }}
                />
                <DateTimePicker
                  style={Styles.picker}
                  date={endDate || null}
                  mode="date"
                  placeholder="Select End Date Time"
                  confirmBtnText="OK"
                  cancelBtnText="CANCEL"
                  maxDate={new Date()}
                  format="YYYY-MM-DD"
                  onDateChange={date => {
                    setEndDate(date);
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
                      backgroundColor: colors.boxColor,
                    },
                  }}
                />
                <DropDownPicker
                  items={props.statusTypes}
                  defaultValue={status}
                  dropDownMaxHeight={200}
                  scrollViewProps={{
                    keyboardShouldPersistTaps: 'always',
                  }}
                  searchable={true}
                  searchablePlaceholder="Search Status"
                  searchableError={() => <Text>No Status Found</Text>}
                  //   isVisible={statusVisible}
                  //   onOpen={() => {
                  //     changeVisibility();
                  //     setStatusVisibility(true);
                  //   }}
                  //   onClose={() => setStatusVisibility(false)}
                  placeholder="Select Status"
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
                  onChangeItem={item => setStatus(item.value)}
                />
              </>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <FlashMessage
          ref={menu => {
            flashBox = menu;
          }}
          position="top"
        />
      </MModal>
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    filterContainer: {
      marginRight: 10,
      marginBottom: 10,
      backgroundColor: colors.button,
      padding: 5,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    searchableStyle: {
      height: 40,
      marginBottom: 0,
      borderBottomWidth: 0,
    },
    button: {
      backgroundColor: colors.button,
      width: 100,
      height: 30,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    },
  });
};
export default OrdersFilterModal;

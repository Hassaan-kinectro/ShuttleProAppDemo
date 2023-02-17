import React, {useState, useEffect} from 'react';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Colors, GlobalStyle, Mixins, Text} from '../../styles';
import {deviceWidth, deviceHeight} from '../../utils/orientation';
import MModal from 'react-native-modal';
import Moment from 'moment';
import {useTheme} from '@react-navigation/native';

const FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm',
};

const SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

const DatePickerField = props => {
  // console.log(props);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dateValue, setDate] = React.useState(null);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const getTitleElement = () => {
    const {date, placeholder, customStyles, allowFontScaling} = props;

    if (!date && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.dateText, customStyles.dateText]}>
        {getDateStr()}
      </Text>
    );
  };
  const onPressDate = () => {
    if (props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    setDate(new Date());

    setModalVisible(true);

    if (typeof props.onOpenModal === 'function') {
      props.onOpenModal();
    }
  };
  const onPressMask = () => {
    if (typeof props.onPressMask === 'function') {
      props.onPressMask();
    } else {
      onPressCancel();
    }
  };

  const onPressCancel = () => {
    //console.log('cancel');
    setModalVisible(false);

    if (typeof props.onCloseModal === 'function') {
      props.onCloseModal();
    }
  };

  const onPressConfirm = () => {
    // console.log('confirm');
    datePicked();
    setModalVisible(false);

    if (typeof props.onCloseModal === 'function') {
      props.onCloseModal();
    }
  };

  const getDate = (date = props.date) => {
    const {mode, minDate, maxDate, format = FORMATS[mode]} = props;

    // date默认值
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, format).toDate();
  };

  const getDateStr = (date = props.date) => {
    const {mode, format = FORMATS[mode]} = props;

    const dateInstance = date instanceof Date ? date : getDate(date);

    if (typeof props.getDateStr === 'function') {
      return props.getDateStr(dateInstance);
    }
    // console.log(
    //   format,
    //   mode,
    //   FORMATS[mode],r
    //   Moment(dateInstance).format(props.format ? props.format : format),
    // );
    return Moment(dateInstance).format(props.format ? props.format : format);
  };

  const datePicked = () => {
    // console.log(dateValue);
    // console.log(typeof props.onDateChange, getDateStr(dateValue));
    if (typeof props.onDateChange === 'function') {
      props.onDateChange(getDateStr(dateValue), dateValue);
    }
  };

  const onDateChange = date => {
    // console.log(date);
    setDate(date);
  };
  const onModalClose = () => {
    setModalVisible(false);
  };
  const {customStyles} = props;
  //console.log(dateValue);
  return (
    <>
      <TouchableOpacity
        onPress={onPressDate}
        activeOpacity={1}
        style={[styles.dateTouch, props.style]}>
        <View style={[styles.dateTouchBody]}>
          <View
            style={[
              styles.dateInput,
              props.customStyles && props.customStyles.dateInput
                ? props.customStyles.dateInput
                : {},
            ]}>
            <Text>{getTitleElement()}</Text>
          </View>
          {props.iconComponent}
          <MModal
            isVisible={modalVisible}
            animationOutTiming={100}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropOpacity={0.4}
            style={{
              flex: 1,
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              //   marginTop: 0,
            }}
            onBackdropPress={onModalClose}
            onSwipeComplete={onModalClose}
            onBackButtonPress={onModalClose}
            swipeThreshold={150}
            // deviceHeight={200}
            swipeDirection={['right']}>
            <View style={[Styles.flexCenter]}>
              <View
                style={[
                  {
                    backgroundColor: colors.box,
                  },
                ]}>
                <TouchableHighlight
                  activeOpacity={1}
                  style={{backgroundColor: Colors.WHITE}}
                  underlayColor={'#00000077'}
                  onPress={onPressMask}>
                  <View
                    style={[styles.datePickerCon, customStyles.datePickerCon]}>
                    <View
                      style={{
                        backgroundColor: colors.boxColor, //props.check ? Colors.SECONDARY : Colors.WHITE,
                      }}>
                      <DatePicker
                        date={dateValue}
                        style={{
                          width: deviceWidth - 20,
                          backgroundColor: colors.gradient2,
                        }}
                        onDateChange={onDateChange}
                        androidVariant="nativeAndroid"
                        textColor={
                          colors.textColor //props.check ? Colors.WHITE : Colors.SECONDARY_5
                        }
                        // fadeToColor={'#000'}
                        mode={props.mode}
                      />
                    </View>
                    <View
                      style={[
                        Styles.flexDirectionRow,
                        Styles.alignItemsCenter,
                        Styles.justifyContentSpaceBetween,
                      ]}>
                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onPressCancel}
                        style={[
                          styles.btnText,
                          styles.btnCancel,
                          customStyles.btnCancel,
                        ]}>
                        <Text
                          style={[
                            styles.btnTextText,
                            styles.btnTextCancel,
                            customStyles.btnTextCancel,
                          ]}>
                          {props.cancelBtnText}
                        </Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={onPressConfirm}
                        style={[
                          styles.btnText,
                          styles.btnConfirm,
                          customStyles.btnConfirm,
                        ]}>
                        <Text
                          style={[
                            styles.btnTextText,
                            customStyles.btnTextConfirm,
                          ]}>
                          {props.confirmBtnText}
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </MModal>
        </View>
        {dateValue ? (
          <TouchableOpacity
            onPress={() => {
              onDateChange(null);
              props.onDateChange(null);
            }}
            style={[styles.button]}>
            <MIcon name="close" size={24} color={colors.button} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </>
  );
};
let useStyles = colors => {
  return StyleSheet.create({
    dateTouch: {
      width: 142,
    },
    button: {
      // height: 30,
      position: 'absolute',
      top: 8,
      right: 40,
      zIndex: 100000,
    },
    dateTouchBody: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateIcon: {
      width: 32,
      height: 32,
      marginLeft: 5,
      marginRight: 5,
    },
    dateInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#aaa',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateText: {
      color: colors.textColor,
    },
    placeholderText: {
      color: Colors.GRAY,
    },
    datePickerMask: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      backgroundColor: colors.boxColor,
    },
    datePickerCon: {
      backgroundColor: Colors.WHITE,
      // height: 0,
      overflow: 'hidden',
    },
    btnText: {
      // position: 'absolute',
      // top: 0,
      height: 42,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.WHITE,
      borderTopWidth: 1,
      width: deviceWidth / 2 - 11,
    },
    btnTextText: {
      fontSize: 16,
      color: Colors.SECONDARY_3,
    },
    btnTextCancel: {
      color: Colors.SECONDARY_4,
    },
    btnCancel: {
      left: 0,
      backgroundColor: Colors.DANGER,
    },
    btnConfirm: {
      right: 0,
      backgroundColor: colors.button,
    },
    datePicker: {
      marginTop: 42,
      borderTopColor: Colors.PRIMARY_1,
      borderTopWidth: 1,
    },
    disabled: {
      backgroundColor: '#eee',
    },
  });
};

export default DatePickerField;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MModal from 'react-native-modal';
import {TouchableOpacity, View} from 'react-native';
import {Styles, Text} from '../../styles';
import {deviceWidth} from '../../utils/orientation';
import {useTheme} from '@react-navigation/native';

const ActivitySelector = props => {
  const {colors} = useTheme();
  const onModalClose = () => {
    props.setVisibility();
  };
  return (
    <MModal
      isVisible={props.visible}
      animationOutTiming={100}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.6}
      style={[Styles.flexCenter]}
      onBackdropPress={onModalClose}
      onSwipeComplete={onModalClose}
      onBackButtonPress={onModalClose}
      deviceWidth={deviceWidth}
      swipeThreshold={150}
      swipeDirection={['down']}>
      <View
        style={[
          Styles.alignItemsCenter,
          Styles.justifyContentSpaceBetween,
          Styles.flexDirectionRow,
          {
            backgroundColor: colors.background,
            width: deviceWidth - 40,
            paddingVertical: 30,
            paddingHorizontal: 20,
            borderRadius: 5,
            height: 120,
          },
        ]}>
        <TouchableOpacity
          style={[
            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
            {
              backgroundColor: colors.button,
              height: 45,
              width: deviceWidth / 3,
              borderRadius: 3,
            },
          ]}
          onPress={() => {
            props.openActivity('confirmation');
            onModalClose();
          }}>
          <Text style={{color: '#fff'}}>Confirmation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
            {
              backgroundColor: colors.button,
              height: 45,
              width: deviceWidth / 3,
              borderRadius: 3,
            },
          ]}
          onPress={() => {
            props.openActivity('follow_up');
            onModalClose();
          }}>
          <Text style={{color: '#fff'}}>Follow-up</Text>
        </TouchableOpacity>
      </View>
    </MModal>
  );
};

export default ActivitySelector;

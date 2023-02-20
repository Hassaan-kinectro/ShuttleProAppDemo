import {View} from 'react-native';
import React from 'react';
import {WarningIcon} from '../../icons';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {GlobalStyle, Text} from '../../styles';
const DataNotAvailable = () => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  return (
    <View
      style={[
        Styles.flexCenter,
        {
          height: deviceHeight - getFixedHeaderHeight() - 5,
        },
      ]}>
      <WarningIcon color={colors.textColorLight} size={40} />
      <Text
        numberOfLines={1}
        color={colors.textColorLight}
        size={16}
        style={{marginTop: 10}}>
        No Social Media Available
      </Text>
    </View>
  );
};

export default DataNotAvailable;

import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

import {Dark, Light, HeaderBG} from '../../utils/imagesPath';

const Inbox = props => {
  const {navigation} = props;
  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();
  const name = 'Story';

  return (
    <>
      <ImageBackground
        source={theme === 'DARK' ? Dark : Light}
        resizeMode="cover"
        style={[
          {
            width: '100%',
            height: '100%',
            borderWidth: 1,
            borderColor: colors.boxBorderColor,
          },
        ]}>
        <CustomHeader name={name} navigation={navigation} />
      </ImageBackground>
    </>
  );
};

export default Inbox;

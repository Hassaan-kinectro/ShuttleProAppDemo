import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

import {Dark, Light, HeaderBG} from '../../utils/imagesPath';

const Inbox = props => {
  console.log(props, 'adasdsa');
  const {navigation} = props;

  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();

  console.log(theme);
  const name = 'Story';
  console.log(name);
  return (
    <>
      <CustomHeader name={name} navigation={navigation} />
      <ImageBackground
        source={theme === 'DARK' ? Dark : Light}
        resizeMode="cover"
        style={[
          styles.image,
          {
            width: '100%',
            height: '100%',
            borderWidth: 1,
            borderColor: colors.boxBorderColor,
          },
        ]}
      />
    </>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

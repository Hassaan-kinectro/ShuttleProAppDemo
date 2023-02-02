import {Text, View} from 'react-native';
import React from 'react';

import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';

const DashBoard = () => {
  const styles = useStyles();

  const theme = useSelector(state => state.themeChange.theme);
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.flex}>
        <Text>Coming Soon..</Text>
      </View>
    </Wrapper>
  );
};

export default DashBoard;

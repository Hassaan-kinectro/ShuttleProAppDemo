import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';

const DashBoard = () => {
  const styles = useStyles();
  const {t} = useTranslation();
  const theme = useSelector(state => state.themeChange.theme);
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.flex}>
        <Text>{t('coming.soon')}</Text>
        <Text>aaaa</Text>
      </View>
    </Wrapper>
  );
};

export default DashBoard;

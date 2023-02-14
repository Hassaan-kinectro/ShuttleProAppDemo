import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, Styles} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';
import CustomHeader from '../../components/CustomHeader';

const DashBoard = ({navigation}) => {
  const styles = useStyles();
  const {t} = useTranslation();
  const theme = useSelector(state => state.themeChange.theme);
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader name={t('dashboard')} navigation={navigation} />
        <View style={styles.flex}>
          <Text>{t('coming.soon')}</Text>
        </View>
      </View>
    </Wrapper>
  );
};

export default DashBoard;

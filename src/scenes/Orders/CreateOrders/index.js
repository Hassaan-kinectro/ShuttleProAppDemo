import {Keyboard, View} from 'react-native';
import React from 'react';
import {Styles, Text} from '../../../styles';
import Wrapper from '../../../components/Wrapper';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../../utils/imagesPath';
import useStyles from './styles';
import CustomHeader from '../../../components/CustomHeader';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import CreateOrderForm from '../../../components/CreateOrderForm';
import {initialValues} from './helper';

const CreateOrders = ({navigation, route}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const styles = useStyles();
  const {t} = useTranslation();
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    // Clean up the event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const OnSubmit = async values => {
    console.log(values, 'values data ');
  };
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader
          name={t('create')}
          searchIcon={false}
          navigation={navigation}
        />
        <View style={Styles.flex}>
          <Formik
            // validationSchema={createProductSchema}
            onSubmit={OnSubmit}
            initialValues={initialValues}>
            {props => {
              return (
                <View style={!isKeyboardOpen ? styles.mB90 : Styles.flex}>
                  <CreateOrderForm {...props} />
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </Wrapper>
  );
};

export default CreateOrders;

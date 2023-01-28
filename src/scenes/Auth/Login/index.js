import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {LogoIcon, LightBG, DarkBG} from '../../../utils/imagesPath';
import {AuthLogin} from '../../../services/Login';
import {StackActions} from '@react-navigation/native';
import useStyles from './styles';
import Form from './form';
import {initialValues, LoginvalidationSchema} from './helper';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {HANDLED, Routes} from '../../../utils/constants';

const LoginScreen = props => {
  const theme = useSelector(state => state.themeChange.theme);
  const authUser = useSelector(state => state.authorized);

  const [loading, setLoading] = React.useState(false);
  const {navigation} = props;
  const styles = useStyles();

  const handleFormSubmit = async (formData, formik) => {
    setLoading(true);
    console.log(formData);
    await AuthLogin(formData.email, formData.password).then(res => {
      setLoading(false);
      console.log('frontend', res);
      if (res.status === 200) {
        props.setAuth(true);
        props.setUserId(res.userId);
        props.setOrganization_id(res.organization_id);
        props.setUserName(res.userName);
        props.setUserRole('admin');
        showMessage({
          message: '',
          description: res.message,
          type: 'success',
        });
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
        }, 1000);
      } else {
        showMessage({
          message: '',
          description: res.message,
          type: 'danger',
        });
      }
    });
    formik.setSubmitting(false);
  };
  return (
    <ImageBackground
      source={theme === 'DARK' ? DarkBG : LightBG}
      resizeMode="cover"
      style={[styles.background]}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={HANDLED}>
        <View style={[styles.containerStyle]}>
          <View style={[styles.imageContainer]}>
            <Image source={LogoIcon} style={styles.logoStyle} />
          </View>
          <View style={[styles.formContainer]}>
            <Formik
              onSubmit={handleFormSubmit}
              validationSchema={LoginvalidationSchema}
              initialValues={initialValues}>
              {({
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
                handleSubmit,
                values,
              }) => (
                <Form
                  setFieldValue={setFieldValue}
                  errors={errors}
                  values={values}
                  touched={touched}
                  setFieldTouched={setFieldTouched}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

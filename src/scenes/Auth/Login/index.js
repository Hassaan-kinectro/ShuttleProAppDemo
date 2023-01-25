import React from 'react';
import {
  Platform,
  ActivityIndicator,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text, Mixins, GlobalStyle} from '../../../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {LogoIcon, LightBG, DarkBG} from '../../../utils/imagesPath';
import Feather from 'react-native-vector-icons/Feather';
import TextField from '../../../components/TextField';
import {AuthLogin} from '../../../services/Login';
import {StackActions, useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {
  deviceHeight,
  deviceWidth,
  IS_ANDROID,
} from '../../../utils/orientation';
import {initialValues, LoginvalidationSchema} from './helper';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';
import {Routes} from '../../../utils/constants';

const LoginScreen = props => {
  const theme = useSelector(state => state.themeChange.theme);

  const passwordField = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(false);
  const {navigation} = props;
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles();

  const handleChange = async (formData, formik) => {
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
        // navigation.dispatch(StackActions.replace('Drawer'));
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(Routes.WORKSPACE));
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
      style={[styles.image, {width: '100%', height: '100%'}]}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={[
            Styles.flex,
            Styles.flexDirectionColumn,

            Styles.alignItemsCenter,
            Styles.justifyContentCenter,
            {justifyContent: 'space-around'},
          ]}>
          <View
            style={[
              Styles.w100,
              Styles.justifyContentCenter,
              Styles.alignItemsCenter,
              {paddingTop: IS_ANDROID ? 60 : 100},
            ]}>
            <Image
              source={LogoIcon}
              style={{width: deviceWidth / 2.6, height: deviceWidth / 2.1}}
            />
          </View>
          <View
            style={[
              Styles.w100,
              Styles.alignItemsCenter,
              {height: deviceHeight / 2},
            ]}>
            <Formik
              onSubmit={handleChange}
              validationSchema={LoginvalidationSchema}
              initialValues={initialValues}>
              {props => (
                <View style={[styles.container]}>
                  <Text
                    color={colors.TextColor}
                    style={{
                      fontFamily: 'Raleway',

                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      fontSize: 24,
                    }}>
                    Hello!
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway',
                      fontStyle: 'normal',
                      fontSize: 16,
                      fontWeight: 'normal',
                      lineHeight: 28,
                      marginTop: 5,
                    }}
                    color={colors.TextColor}>
                    Login to Get Started
                  </Text>
                  <View style={{marginTop: 50}}>
                    <View
                      style={
                        ([Styles.flexCenter],
                        {
                          backgroundColor: 'transaprent',
                          marginBottom: 10,
                        })
                      }>
                      <TextField
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        tintColor={colors.TextColor}
                        textColor={colors.loginText}
                        baseColor={colors.baseColor}
                        placeholderTextColor={colors.placeholder}
                        // inputStyle={
                        //   props.touched.name && props.errors.name
                        //     ? Styles.InputErrorStyle
                        //     : Styles.InputStyle
                        // }
                        errorStyle={{paddingTop: 20}}
                        labelStyle={{fontSize: Mixins.scaleFont(15)}}
                        onChangeText={email =>
                          props.setFieldValue('email', email)
                        }
                        onBlur={() => props.setFieldTouched('email')}
                        error={props.touched.email && props.errors.email}
                        keyboardType="email-address"
                        autoFocus={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType="email"
                        returnKeyType="next"
                        // ref={emailField}
                        onSubmitEditing={() => {
                          passwordField.current.focus();
                        }}
                        fontSize={13}
                      />
                    </View>
                    <View
                      style={
                        ([Styles.flexCenter],
                        {
                          backgroundColor: 'transparent',
                          marginBottom: 10,
                        })
                      }>
                      <TextField
                        label="Password"
                        name="password"
                        placeholder="Enter Password"
                        tintColor={colors.TextColor}
                        textColor={colors.loginText}
                        baseColor={colors.baseColor}
                        placeholderTextColor={colors.placeholder}
                        // inputStyle={
                        //   props.touched.name && props.errors.name
                        //     ? Styles.InputErrorStyle
                        //     : Styles.InputStyle
                        // }
                        errorStyle={{paddingTop: 20}}
                        labelStyle={{fontSize: Mixins.scaleFont(15)}}
                        secureTextEntry={!hidePassword}
                        onChangeText={password =>
                          props.setFieldValue('password', password)
                        }
                        onBlur={() => props.setFieldTouched('password')}
                        error={props.touched.password && props.errors.password}
                        keyboardType={
                          Platform.OS === 'ios'
                            ? 'numbers-and-punctuation'
                            : 'default'
                        }
                        ref={passwordField}
                        fontSize={13}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={props.handleSubmit}
                      />
                      <TouchableOpacity
                        style={[styles.HideIconView]}
                        onPress={() => setHidePassword(!hidePassword)}>
                        <Feather
                          name={hidePassword ? 'eye' : 'eye-off'}
                          size={15}
                          color={hidePassword ? colors.eyeIcon : colors.eyeIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[Styles.w100, {height: 48}]}>
                    <TouchableOpacity
                      style={[
                        Styles.w100,
                        Styles.justifyContentCenter,
                        Styles.alignItemsCenter,
                      ]}
                      disabled={
                        !props.isValid ||
                        !props.dirty ||
                        props.isSubmitting ||
                        loading
                      }
                      onPress={props.handleSubmit}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.9}}
                        colors={['#139A5C', '#3662A8']}
                        style={styles.linearGradient}>
                        {!loading && (
                          <Text
                            size={Mixins.scaleFont(16)}
                            color={colors.textColorLight}
                            style={[
                              styles.buttonText,
                              {
                                paddingRight: loading ? 15 : 0,
                              },
                            ]}>
                            Login
                          </Text>
                        )}
                      </LinearGradient>
                      {loading && (
                        <ActivityIndicator
                          type={'ThreeBounce'}
                          size={30}
                          color={colors.textColorLight}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

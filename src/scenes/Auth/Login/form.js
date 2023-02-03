import React from 'react';
import {ActivityIndicator, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import useStyles from './styles';
import {Text, Mixins} from '../../../styles';
import Feather from 'react-native-vector-icons/Feather';
import TextField from '../../../components/TextField';
import {IS_IOS} from '../../../utils/orientation';
import {FONT_FAMILY} from '../../../utils/constants';
const LoginForm = ({
  setFieldValue,
  errors,
  values,
  handleSubmit,
  setFieldTouched,
  touched,
  loading,
}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const styles = useStyles();
  const passwordField = React.useRef(null);
  const [hidePassword, setHidePassword] = React.useState(false);
  console.log(values);
  return (
    <View style={[styles.container]}>
      <Text
        color={colors.TextColor}
        size={24}
        fontFamily={FONT_FAMILY.SEMI_BOLD}>
        {t('hello')}
      </Text>
      <Text size={16} style={styles.getStartedText} color={colors.TextColor}>
        {t('login.get.started')}
      </Text>
      <View style={styles.topMargin}>
        <View style={styles.bottomMargin}>
          <TextField
            label={t('email')}
            name="email"
            placeholder={t('email.placeholder')}
            tintColor={colors.TextColor}
            textColor={colors.loginText}
            baseColor={colors.baseColor}
            placeholderTextColor={colors.placeholder}
            errorStyle={styles.errorStyle}
            labelStyle={{fontSize: Mixins.scaleFont(15)}}
            onChangeText={e => setFieldValue('email', e)}
            onBlur={() => setFieldTouched('email')}
            error={touched.email && errors.email}
            keyboardType="email-address"
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordField.current.focus();
            }}
            fontSize={13}
          />
        </View>
        <View style={styles.bottomMargin}>
          <TextField
            label={t('password')}
            name="password"
            placeholder={t('password.placeholder')}
            tintColor={colors.TextColor}
            textColor={colors.loginText}
            baseColor={colors.baseColor}
            placeholderTextColor={colors.placeholder}
            errorStyle={styles.errorStyle}
            labelStyle={{fontSize: Mixins.scaleFont(15)}}
            secureTextEntry={!hidePassword}
            onChangeText={p => setFieldValue('password', p)}
            onBlur={() => setFieldTouched('password')}
            error={touched.password && errors.password}
            keyboardType={IS_IOS ? 'numbers-and-punctuation' : 'default'}
            ref={passwordField}
            fontSize={13}
            returnKeyType="done"
            blurOnSubmit={false}
            onSubmitEditing={handleSubmit}
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
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={loading}
          onPress={handleSubmit}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.9}}
            colors={['#139A5C', '#3662A8']}
            style={styles.linearGradient}>
            {!loading ? (
              <Text
                size={Mixins.scaleFont(16)}
                fontFamily={FONT_FAMILY.REGULAR}
                color={colors.white}
                style={[styles.buttonText]}>
                {t('login')}
              </Text>
            ) : (
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.textColorLight}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginForm;

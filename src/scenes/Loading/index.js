import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {StackActions, useTheme} from '@react-navigation/native';
import {GlobalStyle} from '../../styles';
import {Routes} from '../../utils/constants';
import {isAuthExist} from '../../config/authSettings';

//import messaging from '@react-native-firebase/messaging';
const LoadingScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  React.useEffect(() => {
    isAuthExist().then(async res => {
      console.log(res);
      if (res) {
        // navigation.navigate('Drawer');
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
        }, 1000); // navigation.navigate('Workspace')
      } else {
        // navigation.navigate('Login');
        navigation.dispatch(StackActions.replace(Routes.LOGIN));
      }
    });
  }, [navigation]);

  return (
    <>
      <View style={[Styles.flexCenter, Styles.primaryBackground]}>
        <ActivityIndicator color={colors.themeIcon} size={50} />
      </View>
    </>
  );
};
export default LoadingScreen;

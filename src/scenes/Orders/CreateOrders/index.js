import {Keyboard, Platform, View} from 'react-native';
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
import {
  defaultHelpersData,
  getHelpersData,
  initialValues,
  OrderSchemas,
} from './helper';

const CreateOrders = ({navigation, route}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const styles = useStyles();
  const {t} = useTranslation();
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [helpersData, setHelpersData] = React.useState(defaultHelpersData);
  // get workspace id for fetch data
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );

  const numericKeyboard = Platform.OS === 'ios' ? 'numeric' : 'number-pad';

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

  // fetch orders data
  React.useEffect(() => {
    console.log('okokok');
    getHelpersData(setHelpersData, workspaceId);
  }, [workspaceId]);

  const OnSubmit = async values => {
    console.log(values, 'values data onsubmit ');
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
            onSubmit={OnSubmit}
            validationSchema={OrderSchemas}
            initialValues={initialValues}>
            {({
              setFieldTouched,
              setFieldValue,
              handleSubmit,
              touched,
              errors,
              reset,
              values,
            }) => {
              return (
                <View style={!isKeyboardOpen ? styles.mB90 : Styles.flex}>
                  <CreateOrderForm
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    reset={reset}
                    values={values}
                    handleSubmit={handleSubmit}
                    helpersData={helpersData}
                    numericKeyboard={numericKeyboard}
                  />
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

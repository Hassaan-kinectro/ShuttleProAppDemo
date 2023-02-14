import React, {useEffect, useRef} from 'react';
import MModal from 'react-native-modal';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors, Mixins, Text, GlobalStyle} from '../../styles';
import {deviceHeight, IS_IOS} from '../../utils/orientation';
import {useHeaderHeight} from '@react-navigation/elements';
import Wrapper from '../Wrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import FlashMessage from 'react-native-flash-message';
import ActivityForm from '../ActivityForm';
import {useTheme} from '@react-navigation/native';
import {CloseIcon} from '../../icons';
import {CreateActivity} from '../../services/Activity';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../utils/imagesPath';
import {scaleSize} from '../../styles/mixins';
import {showMessage} from 'react-native-flash-message';

const ComType = [
  {label: 'Email', value: 'email'},
  {label: 'Call', value: 'call'},
];

const ComTypeOptions = [
  {name: 'email', type: [{value: 'email', label: 'Email'}]},
  {
    name: 'call',
    type: [
      {value: 'confirmationCall', label: 'Confirmation Calls'},
      {value: 'deliveryCalls', label: 'Delivery Calls'},
    ],
  },
];
const initials = {
  communicationName: null,
  communicationType: null,
  recipientGroup: null,
  template: null,
  remarks: '',
  description: '',
};

const ChangeOrderStatusModal = props => {
  const theme = useSelector(state => state.themeChange.theme);

  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const {obj} = props;
  const [loading, setLoading] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const headerHeight = useHeaderHeight();
  const flashBox = useRef(null);
  useEffect(() => {
    setLoading(false);
    setReset(false);
  }, [props.visible]);

  const onModalClose = () => {
    props.setVisibility(false);
    setReset(true);
  };
  const handleChange = (FormData, {resetForm}) => {
    setLoading(true);
    if (
      (FormData && FormData.communicationName === null) ||
      FormData.remarks === '' ||
      FormData.communicationType === null ||
      FormData.template === null ||
      FormData.description === ''
    ) {
      setLoading(false);
      return showMessage({
        message: '',
        description: 'Activity Is Not Created',
        type: 'DANGER',
      });
    } else {
      const obj2 = {
        trackingId:
          props && props.order && props.order.tracking_id
            ? props.order.tracking_id
            : null,
        date: '',
        orderId: props.id,
        message: FormData && FormData.description ? FormData.description : null,
        customerName:
          props &&
          props.order &&
          props.order.customer &&
          props.order.customer.name
            ? props.order.customer.name
            : null,
        contact:
          props &&
          props.order &&
          props.order.customer &&
          props.order.customer.contact
            ? props.order.customer.contact
            : null,
        notificationTimer: '',
        scheduledTime: '',
        workspaceId: workspace_id,
        subject: FormData && FormData.remarks ? FormData.remarks : null,
        mailGroupId:
          FormData && FormData.recipientGroup && FormData.recipientGroup.id
            ? FormData.recipientGroup.id
            : null,
        name:
          FormData &&
          FormData.communicationName &&
          FormData.communicationName.value
            ? FormData.communicationName.value
            : null,
        type:
          FormData &&
          FormData.communicationType &&
          FormData.communicationType.value
            ? FormData.communicationType.value
            : null,
        templateId:
          FormData && FormData.template && FormData.template.id
            ? FormData.template.id
            : null,
        status: '',
      };
      CreateActivity(obj2).then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            showMessage({
              message: '',
              description: 'Activity Created Successfully',
              type: 'success',
            });
            setLoading(false);
            onModalClose();
            setReset(true);
            resetForm();
          }, 1000);
          if (props.refreshServices) {
            props.refreshServices();
          }
        } else {
          showMessage({
            message: '',
            description: 'Activity Is Not Created',
            type: 'DANGER',
          });
          setLoading(false);
        }
      });
    }
  };
  const {statuses, recipientGroups, emailTemplates, users, visible, order} =
    props;

  return (
    <>
      <MModal
        isVisible={visible}
        animationOutTiming={100}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.8}
        style={styles.modal}
        onBackdropPress={onModalClose}
        onSwipeComplete={onModalClose}
        onBackButtonPress={onModalClose}
        swipeThreshold={150}
        deviceHeight={deviceHeight}
        swipeDirection={['right']}>
        <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
          <View
            style={[
              Styles.flex,
              {
                justifyContent: 'center',
                marginVertical: 30,
              },
            ]}>
            <View
              style={[
                {
                  marginTop: IS_IOS ? scaleSize(50) : 0,
                },
                Styles.flexDirectionRow,
                Styles.justifyContentSpaceBetween,
                {
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: '600',
                  fontStyle: 'normal',
                }}
                size={Mixins.scaleFont(20)}>
                New Activity
              </Text>
              <TouchableOpacity onPress={onModalClose}>
                <CloseIcon size={24} color={Colors.DANGER} />
              </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
              contentContainerStyle={[
                {
                  minHeight: deviceHeight - headerHeight - 50,
                },
                ,
              ]}
              keyboardShouldPersistTaps={'handled'}>
              <Formik onSubmit={handleChange} initialValues={initials}>
                {props => {
                  const ifNot =
                    props.values.communicationName === null &&
                    props.values.remarks === '' &&
                    props.values.communicationType === null &&
                    props.values.template === null &&
                    props.values.recipientGroup === null &&
                    props.values.description === ''
                      ? true
                      : false;
                  return (
                    <>
                      <View
                        style={[
                          Styles.flex,
                          {
                            paddingHorizontal: scaleSize(25),
                            paddingVertical: scaleSize(10),
                          },
                        ]}>
                        <>
                          <ActivityForm
                            obj={obj}
                            statuses={statuses}
                            order={order}
                            recipientGroups={recipientGroups}
                            emailTemplates={emailTemplates}
                            ComType={ComType}
                            ComTypeOptions={ComTypeOptions}
                            users={users}
                            visible={visible}
                            reset={reset}
                            {...props}
                          />
                          <TouchableOpacity
                            onPress={props.handleSubmit}
                            disabled={loading || ifNot}
                            style={[
                              Styles.alignItemsCenter,
                              Styles.justifyContentCenter,
                              styles.addActivity,
                            ]}>
                            {!loading && (
                              <Text
                                size={Mixins.scaleFont(16)}
                                color={Colors.WHITE}
                                style={[
                                  {
                                    paddingRight: loading ? 15 : 0,
                                  },
                                ]}>
                                ADD ACTIVITY
                              </Text>
                            )}
                            {loading && (
                              <ActivityIndicator
                                type={'ThreeBounce'}
                                size={30}
                                color={colors.textColorLight}
                              />
                            )}
                          </TouchableOpacity>
                        </>
                      </View>
                    </>
                  );
                }}
              </Formik>
            </KeyboardAwareScrollView>
          </View>
          <FlashMessage ref={flashBox} position="top" />
        </Wrapper>
      </MModal>
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    addActivity: {
      backgroundColor: colors.button,
      width: 200,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
    },
    modal: {
      margin: 0,
      marginTop: 0,
    },
  });
};
export default ChangeOrderStatusModal;

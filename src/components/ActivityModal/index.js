import React, {useEffect, useRef} from 'react';
import MModal from 'react-native-modal';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Colors, Mixins, Styles, Spinner, Text, GlobalStyle} from '../../styles';
import {deviceHeight, deviceWidth, IS_IPHONEX} from '../../utils/orientation';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHeaderHeight} from '@react-navigation/elements';
import Wrapper from '../Wrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import FlashMessage from 'react-native-flash-message';
import ActivityForm from '../ActivityForm';
import {useTheme} from '@react-navigation/native';
import {CreateActivity} from '../../services/Activity';
import {useSelector} from 'react-redux';
import {Dark, Light, HeaderBG} from '../../utils/imagesPath';

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
    // type: [
    //   {value: 'call1', label: 'Call 1'},
    //   {value: 'call2', label: 'Call 2'},
    //   {value: 'call3', label: 'Call 3'},
    //   {value: 'call4', label: 'Call 4'},
    // ],
  },
];
const initials = {
  communicationName: null,
  communicationType: null,
  recipientGroup: null,
  template: null,
  remarks: '',
  description: '',
  // orderStatus: null,
  // communicationType: null,
  // recipientGroup: null,
  // recipient: null,
  // template: null,
  // remarks: '',
  // description: '',
  // notificationTime: null,
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
    getRecords();
  }, [props.visible]);
  const getRecords = () => {};
  const onModalClose = () => {
    props.setVisibility(false);
    setReset(true);
  };
  const handleChange = (FormData, {resetForm}) => {
    console.log(FormData, 'HELLLLLOOOOO FORRRMM DATAA22');
    // if (!FormData.orderStatus) {
    //   return flashBox.current.showMessage({
    //     message: '',
    //     description: 'Please select order status!',
    //     type: 'danger',
    //   });
    // }
    // if (!FormData.communicationType) {
    //   return flashBox.current.showMessage({
    //     message: '',
    //     description: 'Please select communication type!',
    //     type: 'danger',
    //   });
    // }
    setLoading(true);

    // const obj = {
    //   order_id: props.id,
    //   status_id: FormData.orderStatus ? FormData.orderStatus.id : null,
    //   communication_type: FormData.communicationType
    //     ? FormData.communicationType.value
    //     : null,
    //   recipient_group_id: FormData.recipientGroup
    //     ? FormData.recipientGroup.id
    //     : null,
    //   recipient_id: FormData.recipient ? FormData.recipient.id : null,
    //   email_template_id: FormData.template ? FormData.template.id : null,
    //   remarks: FormData.remarks,
    //   reason: FormData.description,
    //   user_id: props.userId,
    // };
    // if (FormData.notificationTime) {
    //   obj.reminder = [
    //     {
    //       order_id: props.id,
    //       status_id: FormData.orderStatus ? FormData.orderStatus.id : null,
    //       notification_type: FormData.communicationType
    //         ? FormData.communicationType.value
    //         : null,
    //       notification_time: FormData.notificationTime,
    //       activate: true,
    //       remarks: FormData.remarks,
    //       reason: FormData.description,
    //       user_id: props.userId,
    //     },
    //   ];
    // }
    if (
      FormData &&
      FormData.communicationName &&
      FormData.communicationName.value === null &&
      FormData.remarks === '' &&
      FormData.communicationType &&
      FormData.communicationType.value === null &&
      FormData.template &&
      FormData.template.id === null &&
      FormData.recipientGroup &&
      FormData.recipientGroup.id === null &&
      FormData.description === ''
    ) {
      return flashBox.current.showMessage({
        message: '',
        description: 'Please fill all values!',
        type: 'danger',
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
        emailId: '',
        // FormData && FormData.recipientGroup && FormData.recipientGroup.emailIds
        //   ? FormData.recipientGroup.emailIds
        //   : null,
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
        console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaa');
        if (res.status === 200) {
          console.log(res.status, 'aaaaaaaaaaaaaaaaaaaaaaaa2222222');
          setTimeout(() => {
            flashBox?.current?.showMessage({
              message: '',
              description: res.message,
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
          flashBox?.current?.showMessage({
            message: '',
            description: res.message,
            type: 'danger',
          });
          setLoading(false);
        }
      });

      // CreateCommunication(obj).then((res) => {
      //   if (res.status === 200) {
      //     flashBox.current.showMessage({
      //       message: '',
      //       description: res.message,
      //       type: 'success',
      //     });
      //     setLoading(false);
      //     onModalClose();
      //     if (props.refreshServices) {
      //       props.refreshServices();
      //     }
      //     setReset(true);
      //     resetForm();
      //   } else {
      //     flashBox.current.showMessage({
      //       message: '',
      //       description: res.message,
      //       type: 'danger',
      //     });
      //     setLoading(false);
      //   }
      // });
    }
  };
  const {
    statuses,
    recipientGroups,
    emailTemplates,
    customers,
    mailingLists,
    users,
    statusId,
    activityType,
    visible,
    order,
  } = props;

  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <ImageBackground source={theme === 'DARK' ? HeaderBG : HeaderBG}>
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
            <View
              style={[
                Styles.flex,
                {
                  backgroundColor: colors.background,
                  paddingTop: IS_IPHONEX ? 50 : 0,
                },
              ]}>
              <TouchableOpacity
                onPress={onModalClose}
                style={{backgroundColor: Colors.TRANSPARENT, marginTop: 50}}
              />
              <KeyboardAwareScrollView
                contentContainerStyle={[
                  {
                    backgroundColor: colors.background,
                    padding: 10,
                  },
                ]}
                keyboardShouldPersistTaps={'always'}>
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
                        <TouchableOpacity
                          activeOpacity={1}
                          style={[
                            Styles.flex,
                            {
                              backgroundColor: colors.background,
                              minHeight: deviceHeight - headerHeight - 50,
                            },
                          ]}>
                          <>
                            <View style={[Styles.pB10, Styles.mV10]}>
                              <Text size={Mixins.scaleFont(20)}>
                                New Activity
                              </Text>
                            </View>
                            <ActivityForm
                              obj={obj}
                              statuses={statuses}
                              order={order}
                              recipientGroups={recipientGroups}
                              emailTemplates={emailTemplates}
                              customers={customers}
                              statusId={statusId}
                              ComType={ComType}
                              ComTypeOptions={ComTypeOptions}
                              activityType={activityType}
                              mailingLists={mailingLists}
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
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={onModalClose}
                          style={[styles.btnClose]}>
                          <MIcon name="close" size={24} color={Colors.DANGER} />
                        </TouchableOpacity>
                      </>
                    );
                  }}
                </Formik>
              </KeyboardAwareScrollView>
            </View>
            <FlashMessage ref={flashBox} position="top" />
          </MModal>
        </ImageBackground>
      </Wrapper>
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    btnClose: {
      position: 'absolute',
      top: 25,
      right: 15,
    },
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

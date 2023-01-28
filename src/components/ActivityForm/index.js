import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, GlobalStyle, Mixins, Styles, Text} from '../../styles';
import {deviceWidth} from '../../utils/orientation';
import TextField from '../TextField';
import DropDownPicker from '../DropDown';
import {useTheme} from '@react-navigation/native';
import {descriptionTemplateParser} from '../../utils/Parser';

const ActivityForm = props => {
  const {order} = props;
  const {obj} = props;

  const [status, setStatus] = useState(null);
  const [communicationType, setCommunicationType] = useState(null);
  const [communicationName, setCommunicationName] = useState(null);
  const [comTypeVisible, setComTypeVisibility] = useState(false);
  const [nameVisible, setNameVisibility] = useState(false);
  const [recipientGroup, setRecipientGroup] = useState(null);
  const [recipientGroupData, setRecipientGroupData] = useState([]);
  const [recipientGroupVisible, setRecipientGroupVisibility] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [recipientData, setRecipientData] = useState([]);
  const [template, setTemplate] = useState(null);
  const [templateData, setTemplateData] = useState([]);
  const [templateVisible, setTemplateVisibility] = useState(false);
  const [hideField, setHiddenField] = useState(false);
  const [tempTemplates, setTempTemplates] = useState([]);
  const [comTypeData, setCompTypeData] = useState([]);

  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();

  useEffect(() => {
    if (props.reset) {
      setStatus(null);
      setCommunicationType(null);
      setCommunicationName(null);
      setComTypeVisibility(false);
      setRecipientGroup(null);
      setRecipient(null);
      setTemplate(null);
    }
  }, [props]);
  useEffect(() => {
    if (obj) {
      if (obj.name) {
        props.setFieldValue(
          'communicationName',
          props.ComType.find(d => d.value === obj.name),
        );
        setCommunicationName(obj.name);
        const arr =
          props.ComTypeOptions &&
          props.ComTypeOptions.length > 0 &&
          props.ComTypeOptions.find(i => i.name === obj.name);
        setCompTypeData(arr.type);
        const emailTemps =
          props.emailTemplates &&
          props.emailTemplates.length > 0 &&
          props.emailTemplates.filter(i => i.type === obj.name);
        setTempTemplates(emailTemps);
      }
      if (obj.type) {
        const arr =
          props.ComTypeOptions &&
          props.ComTypeOptions.length > 0 &&
          props.ComTypeOptions.find(i => i.name === obj.name);
        setCommunicationType(obj.type);
        props.setFieldValue(
          'communicationType',
          arr.type.find(d => d.value === obj.type),
        );

        setCommunicationType(obj.type);
      }
      if (obj.templateId && obj.message && obj.subject) {
        props.setFieldValue(
          'template',
          props.emailTemplates.find(d => d.id === obj.templateId),
        );
        setTemplate(obj.templateId);
        props.setFieldValue('remarks', obj.subject);
        props.setFieldValue('description', obj.message);
      }
    }
  }, [obj]);
  useEffect(() => {
    if (props.visible && props.recipientGroups) {
      setRecipientGroupData(props.recipientGroups);
    }
    if (props.visible && props.customers) {
      setRecipientData(props.customers);
    }
    if (props.visible && props.emailTemplates) {
      setTemplateData(props.emailTemplates);
    }
  }, [props.visible]);

  const changeRecipient = item => {
    if (item === 'Mailing List') {
      setRecipientData(props.mailingLists);
      setRecipient(
        props.mailingLists.length > 0 ? props.mailingLists[0].value : null,
      );
      props.setFieldValue(
        'recipient',
        props.mailingLists.length > 0 ? props.mailingLists[0] : null,
      );
    } else if (item === 'Customer') {
      setRecipientData(props.customers);
      setRecipient(
        props.customers.length > 0 ? props.customers[0].value : null,
      );
      props.setFieldValue(
        'recipient',
        props.customers.length > 0 ? props.customers[0] : null,
      );
    } else if (item === 'TCS') {
      setRecipientData(props.tcs);
      setRecipient(props.tcs.length > 0 ? props.tcs[0].value : null);
      props.setFieldValue(
        'recipient',
        props.tcs.length > 0 ? props.tcs[0] : null,
      );
    } else if (item === 'Staff') {
      setRecipientData(props.users);
      setRecipient(props.users.length > 0 ? props.users[0].value : null);
      props.setFieldValue(
        'recipient',
        props.users.length > 0 ? props.users[0] : null,
      );
    }
  };
  const changeEmailTemplate = item => {
    if (!item) {
      return false;
    }
    const result = descriptionTemplateParser(item.format, order);
    if (result) {
      props.setFieldValue('description', result || '');
      props.setFieldValue('remarks', item.label);
    } else {
      props.setFieldValue('remarks', item.label);
      props.setFieldValue('description', item.format);
    }
  };
  const changeVisibility = () => {
    setComTypeVisibility(false);
    setRecipientGroupVisibility(false);
    setNameVisibility(false);
    setTemplateVisibility(false);
  };

  return (
    <>
      {!hideField ? (
        <>
          <Text size={Mixins.scaleFont(12)} style={[Styles.mB15]}>
            Name
          </Text>
          <DropDownPicker
            items={props.ComType}
            defaultValue={communicationName}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={nameVisible}
            onOpen={() => {
              changeVisibility();
              setNameVisibility(true);
            }}
            onClose={() => setNameVisibility(false)}
            placeholder="Select Name"
            containerStyle={Styles.containerStyle}
            style={Styles.dropDownContainerStyle}
            itemStyle={Styles.itemStyle}
            arrowColor={colors.button}
            labelStyle={Styles.labelStyle}
            activeLabelStyle={Styles.activeLabelStyle}
            selectedLabelStyle={Styles.activeLabelStyle}
            placeholderStyle={Styles.placeholderStyle}
            dropDownStyle={Styles.dropDownContainerStyle}
            searchablePlaceholderTextColor={colors.placeholder}
            searchableStyle={Styles.searchableStyle}
            onChangeItem={item => {
              setCommunicationName(item.value);
              props.setFieldValue('communicationName', item);
              const arr =
                props.ComTypeOptions &&
                props.ComTypeOptions.length > 0 &&
                props.ComTypeOptions.find(i => i.name === item.value);

              const emailTemps =
                props.emailTemplates &&
                props.emailTemplates.length > 0 &&
                props.emailTemplates.filter(i => i.type === item.value);

              setTempTemplates(emailTemps);
              setCompTypeData(arr.type);
            }}
            zIndex={50010}
          />
          <Text size={Mixins.scaleFont(12)} style={[Styles.mB15]}>
            Type
          </Text>
          <DropDownPicker
            items={comTypeData}
            defaultValue={communicationType}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={comTypeVisible}
            onOpen={() => {
              changeVisibility();
              setComTypeVisibility(true);
            }}
            onClose={() => setComTypeVisibility(false)}
            placeholder="Select Type"
            containerStyle={Styles.containerStyle}
            style={Styles.dropDownContainerStyle}
            itemStyle={Styles.itemStyle}
            arrowColor={colors.button}
            labelStyle={Styles.labelStyle}
            activeLabelStyle={Styles.activeLabelStyle}
            selectedLabelStyle={Styles.activeLabelStyle}
            placeholderStyle={Styles.placeholderStyle}
            dropDownStyle={Styles.dropDownContainerStyle}
            searchablePlaceholderTextColor={colors.placeholder}
            searchableStyle={Styles.searchableStyle}
            onChangeItem={item => {
              setCommunicationType(item.value);
              props.setFieldValue('communicationType', item);
            }}
            zIndex={50009}
          />
        </>
      ) : null}
      <>
        <Text size={Mixins.scaleFont(12)} style={[Styles.mB15]}>
          Recipient Group
        </Text>
        <DropDownPicker
          items={recipientGroupData}
          defaultValue={recipientGroup}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={recipientGroupVisible}
          onOpen={() => {
            changeVisibility();
            setRecipientGroupVisibility(true);
          }}
          onClose={() => setRecipientGroupVisibility(false)}
          placeholder="Select Recipient Group"
          containerStyle={Styles.containerStyle}
          style={Styles.dropDownContainerStyle}
          itemStyle={Styles.itemStyle}
          arrowColor={colors.button}
          labelStyle={Styles.labelStyle}
          activeLabelStyle={Styles.activeLabelStyle}
          selectedLabelStyle={Styles.activeLabelStyle}
          placeholderStyle={Styles.placeholderStyle}
          dropDownStyle={Styles.dropDownContainerStyle}
          searchablePlaceholderTextColor={colors.placeholder}
          searchableStyle={Styles.searchableStyle}
          onChangeItem={item => {
            setRecipientGroup(item.value);
            props.setFieldValue('recipientGroup', item);
            changeRecipient(item.label);
          }}
          zIndex={50008}
        />
        <Text size={Mixins.scaleFont(12)} style={[Styles.mB15]}>
          Template
        </Text>
        <DropDownPicker
          items={tempTemplates}
          defaultValue={template}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={templateVisible}
          onOpen={() => {
            changeVisibility();
            setTemplateVisibility(true);
          }}
          onClose={() => setTemplateVisibility(false)}
          placeholder="Select Template"
          containerStyle={Styles.containerStyle}
          style={Styles.dropDownContainerStyle}
          itemStyle={Styles.itemStyle}
          arrowColor={colors.button}
          labelStyle={Styles.labelStyle}
          activeLabelStyle={Styles.activeLabelStyle}
          selectedLabelStyle={Styles.activeLabelStyle}
          placeholderStyle={Styles.placeholderStyle}
          dropDownStyle={Styles.dropDownContainerStyle}
          searchablePlaceholderTextColor={colors.placeholder}
          searchableStyle={Styles.searchableStyle}
          onChangeItem={item => {
            setTemplate(item.value);
            props.setFieldValue('template', item);
            changeEmailTemplate(item);
          }}
          zIndex={50007}
        />
      </>
      {/* <View>
        <Text size={Mixins.scaleFont(12)} style={[Styles.mB15]}>
          Notification
        </Text>
        <DateTimePicker
          style={Styles.picker}
          date={props.values.notificationTime || null}
          mode="datetime"
          placeholder="Select Notification Date"
          confirmBtnText="OK"
          cancelBtnText="CANCEL"
          format="YYYY-MM-DD HH:mm"
          onDateChange={(date) => {
            props.setFieldValue('notificationTime', date);
          }}
          iconComponent={
            <AIcon
              name="calendar"
              color={colors.icon}
              size={22}
              style={[Styles.iconComponent]}
            />
          }
          customStyles={{
            placeholderText: Styles.dateFont,
            dateInput: [Styles.datePickerStyle],
            dateText: Styles.dateFont,
            btnTextConfirm: {
              color: Colors.WHITE,
            },
            btnTextCancel: {
              color: Colors.WHITE,
            },
            datePickerCon: {
              backgroundColor: colors.boxColor,
            },
          }}
        />
      </View> */}
      <View style={{}}>
        <TextField
          label="Subject"
          name="remarks"
          inputStyle={Styles.InputStyle}
          tintColor={colors.tintColor}
          textColor={colors.TextColor}
          baseColor={colors.baseColor}
          placeholderTextColor={colors.placeholder}
          onChangeText={rem => props.setFieldValue('remarks', rem)}
          onBlur={() => props.setFieldTouched('remarks')}
          onFocus={() => {
            changeVisibility();
          }}
          error={props.touched.remarks && props.errors.remarks}
          autoCapitalize="none"
          labelStyle={{fontSize: Mixins.scaleFont(15)}}
          autoCorrect={false}
          defaultValue={props.values.remarks}
          returnKeyType="next"
          blurOnSubmit={false}
          fontSize={14}
          reset={props.reset}
        />
        <TextField
          label="Message"
          name="description"
          inputStyle={[Styles.InputStyle, {height: 85}]}
          tintColor={colors.tintColor}
          textColor={colors.TextColor}
          baseColor={colors.baseColor}
          placeholderTextColor={colors.placeholder}
          onChangeText={desc => props.setFieldValue('description', desc)}
          onBlur={() => props.setFieldTouched('description')}
          onFocus={() => {
            changeVisibility();
          }}
          labelStyle={{fontSize: Mixins.scaleFont(15)}}
          error={props.touched.description && props.errors.description}
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={props.values.description}
          returnKeyType="next"
          blurOnSubmit={false}
          fontSize={14}
          reset={props.reset}
          multiline={true}
          numberOfLines={15}
          type="textArea"
        />
      </View>
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    dropDownStyle: {
      backgroundColor: Colors.PRIMARY_DARK,
      borderWidth: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    placeholderStyle: {
      color: Colors.GRAY,
    },
    activeLabelStyle: {
      color: Colors.WHITE,
      textTransform: 'capitalize',
    },
    labelStyle: {
      color: Colors.WHITE,
      paddingLeft: 5,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: Colors.PRIMARY_DARK,
      paddingLeft: 10,
      borderRadius: 0,
    },
    dropDownContainerStyle: {
      backgroundColor: Colors.PRIMARY_LIGHT,
      borderWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: Colors.PRIMARY_LIGHT,
      borderRadius: 0,
      width: deviceWidth - 20,
    },
    containerStyle: {
      height: 45,
      marginBottom: 15,
    },
    activeItemStyle: {
      backgroundColor: Colors.PRIMARY_LIGHT,
    },
    searchableStyle: {
      height: 40,
      marginBottom: 0,
      borderBottomWidth: 0,
    },
    datePickerStyle: {
      paddingLeft: 10,
      color: Colors.GRAY,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: Colors.PRIMARY_LIGHT,
      borderWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: Colors.PRIMARY_LIGHT,
      borderRadius: 5,
    },
    dateFont: {
      color: Colors.GRAY,
    },
  });
};
export default ActivityForm;

import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Mixins, Colors, Text} from '../../styles';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
const TextField = React.forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    tintColor,
    baseColor,
    error,
    textColor,
    leftIcon,
    rightIcon,
    fontSize,
    errorColor,
    defaultValue,
    numberOnly,
    transparent,
    errorStyle,
    hideLabel = false,
    hideError = false,
    inputStyle = {},
    clearIcon = false,
    labelStyle = {},
    search = false,
    halfField = false,
    leftField = false,
    rightField = false,
    type = 'field',
    fieldWidth,
    reset = false,
  } = props;
  const [text, changeText] = useState(defaultValue ? defaultValue : '');
  const [height, changeHeight] = useState(type === 'textArea' ? 80 : 40);
  const FontSize = Mixins.scaleFont(fontSize ? fontSize : 12);
  const {colors} = useTheme();
  React.useEffect(() => {
    if (defaultValue) {
      changeText(defaultValue);
    }
  }, [props.defaultValue]);
  React.useEffect(() => {
    if (reset) {
      changeText(defaultValue ? defaultValue : '');
    }
  }, [props.reset]);
  const onTextChange = text => {
    const {onChangeText} = props;
    if (numberOnly) {
      changeText(text.replace(/[^0-9.]/g, ''));
      onChangeText(text.replace(/[^0-9.]/g, ''));
    } else {
      changeText(text);
      onChangeText(text);
    }
  };
  const onFieldFocus = event => {
    let {onFocus} = props;
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };
  const onFieldBlur = event => {
    let {onBlur} = props;
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };
  let FieldHeight = hideLabel ? 65 : 85;
  FieldHeight = hideError ? 55 : FieldHeight;
  FieldHeight = type === 'textArea' ? 120 : FieldHeight;
  let FieldWidth = halfField ? '49%' : '100%';
  if (fieldWidth) {
    FieldWidth = fieldWidth;
  }
  return (
    <View
      style={[
        styles.fieldContainer,
        {height: FieldHeight},
        halfField ? {width: FieldWidth} : {},
        leftField ? {marginRight: '1%'} : {},
        rightField ? {marginLeft: '1%'} : {},
      ]}>
      {!hideLabel ? (
        <Text
          color={baseColor}
          style={[
            styles.labelText,
            labelStyle,
            {marginBottom: transparent ? 0 : 20},
          ]}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.fieldRow,
          {
            borderBottomColor: transparent ? baseColor : 0,
          },
        ]}>
        {leftIcon}
        <TextInput
          selectionColor={tintColor}
          autoCapitalize="none"
          placeholder={transparent ? '' : placeholder ? placeholder : label}
          style={[
            {
              color: textColor,
              fontSize: FontSize,
              marginTop: transparent ? 0 : 10,
              paddingLeft: leftIcon ? 10 : transparent ? 0 : 10,
              height: height,
              backgroundColor: 'transparent',
              borderRadius: transparent ? 0 : 5,
              borderBottomWidth: transparent ? 0 : 0.5,
              borderColor: colors.feildBorder,
              paddingRight: 25,
              fontWeight: '300',
            },
            type === 'textArea' ? {textAlignVertical: 'top'} : {},
            styles.inputField,
            inputStyle,
          ]}
          autoCompleteType="off"
          placeholderTextColor={textColor}
          {...props}
          allowFontScaling={false}
          onChangeText={t => onTextChange(t)}
          value={text}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
          ref={ref}
          // onContentSizeChange={event => {
          //   changeHeight(event.nativeEvent.contentSize.height);
          // }}
        />
        {rightIcon}
        {text.length > 0 && clearIcon ? (
          <MIcon
            onPress={() => {
              onTextChange('');
            }}
            name="clear"
            size={20}
            color={Colors.WHITE}
            style={[{position: 'absolute', right: 5, top: search ? 17 : 12}]}
          />
        ) : null}
      </View>
      {!hideError && (
        <Text
          style={[
            styles.errorText,
            errorStyle,
            {color: errorColor ? errorColor : Colors.DANGER},
          ]}>
          {error ? error : ''}
        </Text>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  fieldRow: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 6,
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldContainer: {marginBottom: 0, height: 85},
  errorText: {
    color: Colors.LIGHT_BLACK_5,
    marginBottom: 0,
    fontSize: Mixins.scaleFont(12),
  },
  inputField: {
    width: '100%',
  },
  labelText: {
    fontSize: Mixins.scaleFont(12),
  },
});
export default TextField;

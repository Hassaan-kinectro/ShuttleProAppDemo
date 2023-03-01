/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Mixins} from '../../../styles';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import InstaStory from 'react-native-insta-story';
import {previewHelper} from './helper';
import {deviceHeight, IS_IOS} from '../../../utils/orientation';
import {BackArrowIcon} from '../../../icons';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../../utils/constants';

const AutoSchedularPreview = ({
  userId,
  values,
  save,
  setFieldValue,
  currentProfile,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();

  const ok = previewHelper(values.slots, currentProfile, userId);

  return (
    <>
      <View style={[styles.filterContainer, {marginBottom: 20}]}>
        <TouchableOpacity
          style={styles.BackStyle}
          onPress={() => {
            setFieldValue && setFieldValue('slots', []);
          }}>
          <BackArrowIcon
            size={28}
            color={colors.searchIcon}
            style={{left: -10}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            size={16}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.SEMI_BOLD}
            lines={1}>
            Scheduled Stories
          </Text>
        </View>
      </View>

      <InstaStory
        data={ok}
        duration={10}
        onStart={item => console.log(item)}
        unPressedBorderColor={'#54788c'}
        pressedBorderColor={'transparent'}
        onClose={item => console.log('close: ', item)}
        customSwipeUpComponent={
          <View>
            <Text />
          </View>
        }
        style={{
          height: IS_IOS ? deviceHeight - 380 : deviceHeight - 350,
        }}
        showAvatarText={true}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => save(values)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.9}}
            colors={['#139A5C', '#3662A8']}
            style={styles.linearGradient}>
            <Text
              size={Mixins.scaleFont(16)}
              fontFamily={FONT_FAMILY.REGULAR}
              color={colors.white}
              style={[styles.buttonText]}>
              Publish
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AutoSchedularPreview;

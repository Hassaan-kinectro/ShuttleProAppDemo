/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image, Platform} from 'react-native';
import React from 'react';
import {GlobalStyle, Mixins, Text} from '../../../styles';
import AutoSchedularList from './autoSchedularList';
import LinearGradient from 'react-native-linear-gradient';
import useStyles from '../styles';
import {FONT_FAMILY} from '../../../utils/constants';
import {useTheme} from '@react-navigation/native';
import InstaStory from 'react-native-insta-story';
import {previewHelper} from './helper';
import {deviceHeight, IS_IOS} from '../../../utils/orientation';
import {
  FilterIcon,
  BackIcon,
  BackArrowIcon,
  PublishIcon,
  CloseIcon,
} from '../../../icons';

const AutoSchedularPreview = ({
  userId,
  values,
  save,
  setFieldValue,
  currentProfile,
}) => {
  const Styles = GlobalStyle();
  const styles = useStyles();
  const {colors} = useTheme();

  const ok = previewHelper(values.slots, currentProfile, userId);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // marginVertical: 20,
        }}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterStyle}
            onPress={() => {
              setFieldValue && setFieldValue('slots', []);
            }}>
            <BackArrowIcon
              size={20}
              color={colors.searchIcon}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterStyle}
            onPress={() => save(values)}>
            <PublishIcon
              size={20}
              color={colors.searchIcon}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => {
            setFieldValue && setFieldValue('slots', []);
          }}>
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
              Back
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
        </TouchableOpacity> */}
      </View>
      <InstaStory
        data={ok}
        duration={5}
        onStart={item => console.log(item)}
        unPressedBorderColor={'#54788c'}
        pressedBorderColor={'transparent'}
        onClose={item => console.log('close: ', item)}
        customSwipeUpComponent={
          <View>
            <Text />
          </View>
        }
        customCloseComponent={<CloseIcon size={24} color={colors.TextColor} />}
        style={{
          marginTop: 30,
          height: IS_IOS ? deviceHeight - 300 : deviceHeight - 270,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
        showAvatarText={true}
        horizontal={false}
        resizeMode="contain"
        avatarTextStyle={{color: '#fff'}}
        customItemComponent={(item, index, handleStoryItemPress) => {
          console.log(item);
          return (
            <>
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  onPress={() => handleStoryItemPress(item)}
                  style={[styles.avatarWrapper]}>
                  <Image
                    style={styles.avatar}
                    source={{uri: item.user_image}}
                    defaultSource={
                      Platform.OS === 'ios'
                        ? './assets/images/no_avatar.png'
                        : null
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}}>
                  <>
                    <Text
                      size={12}
                      color={colors.TextColor}
                      fontFamily={FONT_FAMILY.REGULAR}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>
                      {item.user_name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      size={12}
                      color={colors.TextColor}
                      style={{marginTop: 10}}
                      fontFamily={FONT_FAMILY.REGULAR}>
                      {item.date}
                    </Text>
                  </>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: colors.boxBorderColor,
                  borderWidth: 1,
                  marginVertical: 5,
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default AutoSchedularPreview;

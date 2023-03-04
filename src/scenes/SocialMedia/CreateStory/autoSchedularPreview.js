/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Text, Mixins} from '../../../styles';
import useStyles from '../styles';
import {useTheme} from '@react-navigation/native';
import InstaStory from 'react-native-insta-story';
import FastImage from 'react-native-fast-image';
import {previewHelper} from './helper';
import {deviceHeight, IS_IOS} from '../../../utils/orientation';
import {BackArrowIcon, CloseIcon} from '../../../icons';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../../utils/constants';
import {useSelector} from 'react-redux';

const AutoSchedularPreview = ({
  userId,
  values,
  save,
  setFieldValue,
  currentProfile,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [apiInProgress, setApiInProgress] = React.useState(false);

  const workspace = useSelector(state => state.workspace.workspace);
  const workspaceIcon =
    workspace && workspace.workspace && workspace.workspace.icon
      ? workspace.workspace.icon.thumb.url
      : null;
  const workspaceName =
    workspace && workspace.workspace && workspace.workspace.name
      ? workspace.workspace.name
      : null;

  const stories = previewHelper(
    values.slots,
    currentProfile,
    userId,
    workspaceName,
    workspaceIcon,
  );
  return (
    <>
      <View style={[styles.filterContainer]}>
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
        <Text
          size={16}
          color={colors.TextColor}
          fontFamily={FONT_FAMILY.SEMI_BOLD}
          lines={1}>
          Scheduled Stories
        </Text>
      </View>
      <InstaStory
        data={stories}
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
          marginTop: 10,
          height: IS_IOS ? deviceHeight - 360 : deviceHeight - 330,
          flex: 1,
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
                  onPress={() => handleStoryItemPress(item, index)}
                  style={[styles.avatarWrapper]}>
                  <FastImage
                    style={styles.avatar}
                    source={{uri: item.user_image}}
                    defaultSource={
                      Platform.OS === 'ios'
                        ? './assets/images/no_avatar.png'
                        : null
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 20}}>
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => {
            setApiInProgress(true);
            save(values, setApiInProgress);
          }}>
          {apiInProgress ? (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.9}}
              colors={['#139A5C', '#3662A8']}
              style={styles.linearGradient}>
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.textColorLight}
              />
            </LinearGradient>
          ) : (
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
          )}
          {/* <LinearGradient
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
          </LinearGradient> */}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AutoSchedularPreview;

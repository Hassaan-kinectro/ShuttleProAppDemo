/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
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
      <InstaStory
        data={ok}
        duration={10}
        onStart={item => console.log(item)}
        unPressedBorderColor={'#54788c'}
        onClose={item => console.log('close: ', item)}
        customSwipeUpComponent={
          <View>
            <Text>Swipe</Text>
          </View>
        }
        style={{
          marginTop: 30,
          height: IS_IOS ? deviceHeight - 380 : deviceHeight - 350,
        }}
      />
      {/* <ScrollView>
        <FlatList
          data={
            values && values.slots && values.slots.length > 0
              ? values.slots
              : []
          }
          contentContainerStyle={{
            paddingHorizontal: 5,
          }}
          style={{height: IS_IOS ? deviceHeight - 380 : deviceHeight - 350}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <AutoSchedularList item={item} index={index} />
              </>
            );
          }}
        />
      </ScrollView> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AutoSchedularPreview;

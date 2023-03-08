/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, Image, View, ScrollView} from 'react-native';
import React from 'react';
import useStyles from '../styles';
import {INSTAGRAM, FACEBOOK} from '../../../utils/imagesPath';
import {Styles, Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';

const SocialTabs = ({socialProfiles, changeProfile, currentProfile}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  return (
    <ScrollView
      horizontal={true}
      style={Styles.pL5}
      showsHorizontalScrollIndicator={false}>
      {socialProfiles && socialProfiles.length > 0
        ? socialProfiles.slice(0, 8).map((s, i) => {
            const selected =
              s && s.id === (currentProfile && currentProfile.id);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  changeProfile(s);
                }}
                style={[styles.topHeader]}>
                <View
                  style={[
                    styles.innerHeader,
                    selected ? styles.bg : styles.bgLight,
                  ]}>
                  {s &&
                    s.profile_type === 'facebook' &&
                    s.profile_type !== 'instagram' && (
                      <Image source={FACEBOOK} style={styles.activeHeader} />
                    )}
                  {s &&
                    s.profile_type !== 'facebook' &&
                    s.profile_type === 'instagram' && (
                      <Image source={INSTAGRAM} style={styles.activeHeader} />
                    )}
                  <Text
                    size={12}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.REGULAR}
                    style={[
                      selected ? styles.white : {color: colors.TextColor},
                      {marginHorizontal: 10},
                    ]}>
                    {s.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        : null}
    </ScrollView>
  );
};

export default SocialTabs;

import {TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import CircularImage from '../../../components/CircularImage';
import useStyles from '../styles';
import {INSTAGRAM, FACEBOOK} from '../../../utils/imagesPath';
const SocialTabs = ({socialProfiles, changeProfile}) => {
  const styles = useStyles();

  return (
    <>
      {socialProfiles && socialProfiles.length > 0
        ? socialProfiles.slice(0, 8).map((s, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => changeProfile(s)}>
                <View style={styles.mh5}>
                  <CircularImage
                    img={
                      s &&
                      s.page_icon &&
                      s.page_icon.thumb &&
                      s.page_icon.thumb.url
                    }
                    name={s.profile_type}
                    style={[styles.HeaderImage]}
                  />

                  {s.profile_type === 'facebook' && (
                    <Image source={FACEBOOK} style={styles.active2} />
                  )}
                  {s.profile_type === 'instagram' && (
                    <Image source={INSTAGRAM} style={styles.active2} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        : null}
    </>
  );
};

export default SocialTabs;

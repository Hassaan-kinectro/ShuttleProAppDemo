import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import CircularImage from '../CircularImage';
import {FONT_FAMILY} from '../../utils/constants';
import {Instagram, Facebook} from '../../utils/imagesPath';
const SocialProfileShow = ({i, result}) => {
  return (
    <>
      <View style={styles.container}>
        {i.profile_type === 'facebook' ? (
          <View style={styles.mainContainer}>
            <Image style={styles.fbImage} source={Facebook} />
            <CircularImage
              img={
                i.page_icon.thumb.url ? i.page_icon.thumb.url : i.page_icon.url
              }
              name={i.username}
              style={styles.image}
            />
          </View>
        ) : (
          <>
            <View style={styles.mainContainer}>
              <Image style={styles.fbImage} source={Instagram} />
              <CircularImage
                img={
                  i.page_icon.thumb.url
                    ? i.page_icon.thumb.url
                    : i.page_icon.url
                }
                name={i.username}
                style={styles.image}
              />
            </View>
          </>
        )}
        <Text style={styles.text}>{result ? result : null}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    position: 'relative',
    display: 'flex',
  },
  fbImage: {
    height: 15,
    width: 15,
    position: 'absolute',
    top: -5,
    right: 5,
    zIndex: 999,
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  text: {
    color: '#5285D4',
    fontFamily: FONT_FAMILY.REGULAR,
    paddingTop: 2,
    marginHorizontal: 3,
  },
});

export default SocialProfileShow;

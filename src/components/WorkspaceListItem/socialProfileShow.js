import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularImage from '../CircularImage';
import {Text} from '../../styles';
import {FONT_FAMILY, Routes} from '../../utils/constants';
import {Instagram, Facebook} from '../../utils/imagesPath';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
const SocialProfileShow = ({i, result, item, navigation}) => {
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.container}>
        {i.profile_type === 'facebook' ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(SetWorkspace(item));
              navigation.navigate(Routes.WORKSPACE, {
                screen: Routes.BOTTOMTAB,
                params: {
                  screen: Routes.SOCIALPROFILE,
                  params: {
                    screen: Routes.SOCIALPROFILELIST,
                    params: {
                      workspaceId: item.workspace.id,
                      socialProfile: i,
                    },
                  },
                  initial: false,
                },
                initial: false,
              });
            }}>
            <View style={styles.mainContainer}>
              <Image style={styles.fbImage} source={Facebook} />
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
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                dispatch(SetWorkspace(item));
                navigation.navigate(Routes.WORKSPACE, {
                  screen: Routes.BOTTOMTAB,
                  params: {
                    screen: Routes.SOCIALPROFILE,
                    params: {
                      screen: Routes.SOCIALPROFILELIST,
                      params: {
                        workspaceId: item.workspace.id,
                        socialProfile: i,
                      },
                    },
                    initial: false,
                  },
                  initial: false,
                });
              }}>
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
            </TouchableOpacity>
          </>
        )}
        <Text size={12} style={styles.text}>
          {result ? result : null}
        </Text>
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
    width: 36,
    height: 36,
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

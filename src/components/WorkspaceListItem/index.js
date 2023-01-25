import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {Colors, GlobalStyle, Mixins, Text} from '../../styles';
import {deviceWidth, IS_IOS, IS_ANDROID} from '../../utils/orientation';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import CircularImage from '../CircularImage';
import {StackActions, useTheme} from '@react-navigation/native';

import {
  DemoUser,
  Facebook,
  Instagram,
  Demo1,
  Demo2,
  TCS,
  MNP,
} from '../../utils/imagesPath';

import Feather from 'react-native-vector-icons/Feather';
import {scaleSize} from '../../styles/mixins';
import {FONT_FAMILY} from '../../utils/constants';

const WorkspaceListItem = props => {
  const {item, navigation, workspace, setWorkspaces} = props;
  const dispatch = useDispatch();
  const [socialProfiles, setSocialProfiles] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  let result;
  return (
    <>
      <View style={[Styles.flex]}>
        <TouchableOpacity
          key={item.workspace.id}
          activeOpacity={0.7}
          onPress={() => {
            setWorkspaces(item);
            dispatch(SetWorkspace(item));
            navigation.dispatch(
              StackActions.replace('drawer', {screen: 'bottom tab'}),
            );
          }}
          style={styles.BoxStyle}>
          {/* header  */}
          <TouchableOpacity
            onPress={() => {
              setWorkspaces(item);
              dispatch(SetWorkspace(item));
              navigation.navigate('drawer', {
                screen: 'bottom tab',
                params: {
                  screen: 'orders',
                  params: {
                    screen: 'orders',
                    params: {
                      workspaceId: item.workspace.id,
                    },
                  },
                },
              });
            }}>
            <View
              style={[
                Styles.w100,
                Styles.flexDirectionRow,
                Styles.justifyContentSpaceBetween,
                Styles.alignItemsCenter,
                {
                  paddingHorizontal: scaleSize(15),
                  paddingVertical: scaleSize(15),
                },
              ]}>
              <View style={[Styles.flexDirectionRow, Styles.alignItemsCenter]}>
                <CircularImage
                  img={
                    props.item.workspace.icon
                      ? props.item.workspace.icon.thumb.url
                      : props.item.workspace.icon.url
                  }
                  name={item.workspace.name}
                  style={styles.HeaderImage}
                />
                <View style={[styles.headerTextView]}>
                  <Text
                    lines={2}
                    size={Mixins.scaleFont(16)}
                    style={[styles.headerText]}>
                    {item.workspace.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.headerTextView]}>
                <View style={[styles.dropIcon]}>
                  <F5Icon
                    name={'ellipsis-v'}
                    size={20}
                    style={{color: colors.TextColor}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View
            style={[
              Styles.Centered,
              Styles.w100,
              // Styles.pL10,
              // Styles.pR5,
              Styles.pV5,
            ]}>
            {/* products & Orders */}
            <View
              style={[
                Styles.flexDirectionRow,
                {
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingHorizontal: scaleSize(15),
                  marginBottom: 11,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate('drawer', {
                    screen: 'bottom tab',
                    params: {
                      screen: 'products',
                      params: {
                        screen: 'products',
                        params: {
                          workspaceId: item.workspace.id,
                        },
                      },
                    },
                  });
                }}
                style={[Styles.h100, Styles.flexDirectionRow, styles.w50]}>
                <Text
                  lines={1}
                  color={colors.TextColor}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}>
                  Products:{' '}
                </Text>
                <Text lines={1} color={colors.TextColor}>
                  {item.products}{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate('drawer', {
                    screen: 'bottom tab',
                    params: {
                      screen: 'orders',
                      params: {
                        screen: 'orders',
                        params: {
                          workspaceId: item.workspace.id,
                        },
                      },
                    },
                  });
                }}
                style={[
                  Styles.h100,
                  Styles.flexDirectionRow,
                  styles.w40,
                  {paddingLeft: 50},
                ]}>
                <Text
                  color={colors.TextColor}
                  lines={1}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}>
                  Orders:{' '}
                </Text>
                <Text color={colors.TextColor} lines={1}>
                  {item.orders}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                Styles.flexDirectionRow,
                {
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingHorizontal: scaleSize(15),
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate('drawer', {
                    screen: 'bottom tab',
                    params: {
                      screen: 'settings',
                      params: {
                        screen: 'invite members',
                        params: {
                          screen: 'invite members',
                          params: {
                            workspaceId: item.workspace.id,
                          },
                        },
                        initial: false,
                      },
                      initial: false,
                    },
                    initial: false,
                  });
                }}
                style={[Styles.h100, Styles.flexDirectionRow, styles.w40]}>
                <Text
                  lines={1}
                  color={colors.TextColor}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}>
                  Members:
                </Text>
                <View
                  style={{
                    marginLeft: 5,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={DemoUser}
                  />
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      left: -8,
                      zIndex: 999,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={Demo1}
                  />
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      left: -15,
                      zIndex: 999,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={Demo2}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate('drawer', {
                    screen: 'bottom tab',
                    params: {
                      screen: 'settings',
                      params: {
                        screen: 'shippers',
                        params: {
                          screen: 'shippers',
                          params: {
                            workspaceId: item.workspace.id,
                          },
                        },
                        initial: false,
                      },
                      initial: false,
                    },
                    initial: false,
                  });
                }}
                style={[
                  Styles.h100,
                  Styles.flexDirectionRow,

                  styles.w50,
                  {
                    paddingLeft: scaleSize(30),
                    // backgroundColor: 'green',
                    // alignItems: 'flex-end',
                  },
                ]}>
                <Text
                  weight="600"
                  lines={1}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}
                  color={colors.TextColor}>
                  Shippers:
                </Text>
                <View
                  style={{
                    marginLeft: 5,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={MNP}
                  />
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      left: -8,
                      zIndex: 999,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={TCS}
                  />
                  <Image
                    style={{
                      border: colors.boxBorderColor,
                      height: 24,
                      width: 24,
                      left: -15,
                      zIndex: 999,
                      borderRadius: 70,
                      borderWidth: 1,
                      borderColor: colors.boxBorderColor,
                    }}
                    source={Demo2}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.hairline} />

            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginTop: 15,
              }}
              activeOpacity={0.8}
              onPress={() => {
                setSocialProfiles(!socialProfiles);
              }}>
              <View
                style={[
                  Styles.DisplayFlex,
                  Styles.flexDirectionRow,
                  Styles.justifyContentSpaceBetween,
                  Styles.w100,
                ]}>
                <Text
                  lines={1}
                  color={Colors.WHITE}
                  style={{flexDirection: 'row', textTransform: 'capitalize'}}>
                  {props.item.product_details}
                </Text>
                <View style={{width: 25, paddingRight: 5}}>
                  {socialProfiles ? (
                    <Feather
                      name="chevron-up"
                      size={25}
                      style={{color: colors.boxBorderColor}}
                    />
                  ) : (
                    <Feather
                      name="chevron-down"
                      size={25}
                      style={{color: colors.boxBorderColor}}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {socialProfiles ? (
              <View
                style={[
                  {
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  },
                ]}>
                {item &&
                item.social_profiles &&
                item.social_profiles.length > 0 ? (
                  item.social_profiles.map(i => {
                    console.log('this is iiiiii', i);
                    const name2 = i.username;
                    result = name2.slice(0, 5) + '...';
                    if (result) {
                      console.log('this', result);
                    }
                    return (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {console.log('raaann')}
                        {i.profile_type === 'facebook' ? (
                          <View
                            style={{
                              position: 'relative',
                              display: 'flex',
                            }}>
                            <Image
                              style={{
                                height: 15,
                                width: 15,
                                position: 'absolute',
                                top: -5,
                                right: 5,
                                zIndex: 999,
                              }}
                              source={Facebook}
                            />
                            <CircularImage
                              img={
                                i.page_icon.thumb.url
                                  ? i.page_icon.thumb.url
                                  : i.page_icon.url
                              }
                              name={i.username}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                                marginHorizontal: 10,
                              }}
                            />
                          </View>
                        ) : (
                          <>
                            <View
                              style={{
                                position: 'relative',
                                display: 'flex',
                              }}>
                              <Image
                                style={{
                                  height: 15,
                                  width: 15,
                                  position: 'absolute',
                                  top: -5,
                                  right: 5,
                                  zIndex: 999,
                                }}
                                source={Instagram}
                              />
                              <CircularImage
                                img={
                                  i.page_icon.thumb.url
                                    ? i.page_icon.thumb.url
                                    : i.page_icon.url
                                }
                                name={i.username}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: 25,
                                  height: 25,
                                  borderRadius: 100,
                                  marginHorizontal: 10,
                                }}
                              />
                            </View>
                          </>
                        )}

                        <Text
                          style={{
                            color: '#5285D4',
                            marginHorizontal: 3,
                          }}>
                          {result ? result : null}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View>
                    <Text>No Social Profile Added</Text>
                  </View>
                )}
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
    },
    Box: {
      // marginBottom: IS_IOS ? 17 : 15,
      // paddingLeft: IS_IOS ? 15 : 10,
      // marginTop: IS_IOS ? 12 : 10,
    },

    CirculedImage: {width: 25, height: 25, borderRadius: 100, marginLeft: 1},
    w40: {
      width: '40%',
    },
    w50: {
      width: '50%',
    },
    moreIcon: {
      height: 25,
      width: 25,
      borderRadius: 15,
      backgroundColor: colors.gradient1,
    },
    ShipperContainer: {
      marginTop: 5,
      marginBottom: -5,
      height: 50,
      paddingBottom: 5,
      alignItems: 'center',
    },
    ProductOrderContainer: {
      height: 20,
      alignContent: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTextView: {
      // justifyContent: 'center',
      // alignContent: 'center',
      // // backgroundColor: 'red',
      // // marginLeft: 10,
      // flex: 1,
      // width: 150,
    },
    headerText: {
      textAlignVertical: 'center',
      paddingBottom: 5,
      paddingLeft: scaleSize(10),

      color: colors.TextHeader,
    },
    HeaderImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      // backgroundColor: 'red',
      // marginLeft: 10,,
    },
    HeaderView: {
      // height: 55,
    },
    dropIcon: {
      // position: 'absolute', top: 20, right: 15, width: 20
    },

    MemberImage: {
      width: 25,
      height: 25,
      borderRadius: 15,
      paddingLeft: 20,
      marginLeft: -10,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      width: '90%',
      paddingHorizontal: 15,
      marginTop: 15,
    },
  });
};
export default WorkspaceListItem;

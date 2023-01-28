import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {Colors, GlobalStyle, Mixins, Text} from '../../styles';
import useStyles from './styles';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import CircularImage from '../CircularImage';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {DemoUser, Demo1, Demo2, TCS, MNP, TRAX} from '../../utils/imagesPath';
import Feather from 'react-native-vector-icons/Feather';
import {scaleSize} from '../../styles/mixins';
import {FONT_FAMILY} from '../../utils/constants';
import {Routes} from '../../utils/constants';
import SocialProfileShow from './socialProfileShow';

const WorkspaceListItem = props => {
  const {item, navigation, setWorkspaces} = props;
  const dispatch = useDispatch();
  const [socialProfiles, setSocialProfiles] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles();
  const {t} = useTranslation();
  const Styles = GlobalStyle();
  let result;
  return (
    <>
      <View style={[Styles.flex]}>
        <View style={styles.BoxStyle}>
          <TouchableOpacity
            onPress={() => {
              setWorkspaces(item);
              dispatch(SetWorkspace(item));
              navigation.navigate(Routes.DRAWER, {
                screen: Routes.BOTTOMTAB,
                params: {
                  screen: Routes.ORDERS,
                  params: {
                    screen: Routes.ORDERS,
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
                styles.padding,
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
                <View>
                  <Text
                    lines={2}
                    size={Mixins.scaleFont(16)}
                    style={[styles.headerText]}>
                    {item.workspace.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <F5Icon
                  name={'ellipsis-v'}
                  size={20}
                  style={{color: colors.TextColor}}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={[Styles.Centered, Styles.w100, Styles.pV5]}>
            <View style={[Styles.flexDirectionRow, styles.Dashboard]}>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate(Routes.DRAWER, {
                    screen: Routes.BOTTOMTAB,
                    params: {
                      screen: Routes.PRODUCTS,
                      params: {
                        screen: Routes.PRODUCTS,
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
                  {t('products')}: {''}
                </Text>
                <Text lines={1} color={colors.TextColor}>
                  {item.products}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate(Routes.DRAWER, {
                    screen: Routes.BOTTOMTAB,
                    params: {
                      screen: Routes.ORDERS,
                      params: {
                        screen: Routes.ORDERS,
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
                  styles.pL50,
                ]}>
                <Text
                  color={colors.TextColor}
                  lines={1}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}>
                  {t('orders')}: {''}
                </Text>
                <Text color={colors.TextColor} lines={1}>
                  {item.orders}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[Styles.flexDirectionRow, styles.members]}>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate(Routes.DRAWER, {
                    screen: Routes.BOTTOMTAB,
                    params: {
                      screen: Routes.SETTINGS,
                      params: {
                        screen: Routes.INVITEMEMBERS,
                        params: {
                          screen: Routes.INVITEMEMBERS,
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
                  {t('members')}: {''}
                </Text>
                <View style={styles.memberStyles}>
                  <Image style={styles.member1} source={DemoUser} />
                  <Image style={styles.member2} source={Demo1} />
                  <Image style={styles.member3} source={Demo2} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setWorkspaces(item);
                  dispatch(SetWorkspace(item));
                  navigation.navigate(Routes.DRAWER, {
                    screen: Routes.BOTTOMTAB,
                    params: {
                      screen: Routes.SETTINGS,
                      params: {
                        screen: Routes.SHIPPERS,
                        params: {
                          screen: Routes.SHIPPERS,
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
                  },
                ]}>
                <Text
                  weight="600"
                  lines={1}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}
                  color={colors.TextColor}>
                  {t('shippers')}: {''}
                </Text>
                <View style={styles.shipperStyle}>
                  <Image style={styles.shipper1} source={MNP} />
                  <Image style={styles.shipper2} source={TCS} />
                  <Image style={styles.shipper3} source={TRAX} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.hairline} />

            <TouchableOpacity
              style={styles.socialSection}
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
                  style={styles.socialProductText}>
                  {props.item.product_details}
                </Text>
                <View style={(styles.pR25, styles.w25)}>
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
              <View style={styles.socialView}>
                {item &&
                item.social_profiles &&
                item.social_profiles.length > 0 ? (
                  item.social_profiles.map((i, k) => {
                    const name2 = i.name;
                    result = name2.slice(0, 5) + '...';
                    return (
                      <>
                        <SocialProfileShow i={i} result={result} k={i.id} />
                      </>
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
        </View>
      </View>
    </>
  );
};

export default WorkspaceListItem;

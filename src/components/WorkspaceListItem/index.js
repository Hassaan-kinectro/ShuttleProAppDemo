/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {Colors, GlobalStyle, Text} from '../../styles';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {DemoUser, Demo1, Demo2, TCS, MNP, TRAX} from '../../utils/imagesPath';
import Feather from 'react-native-vector-icons/Feather';
import {Routes} from '../../utils/constants';
import SocialProfileShow from './socialProfileShow';
import CardHeader from './cardHeader';
const WorkspaceListItem = props => {
  const {item, navigation} = props;
  const dispatch = useDispatch();
  const [socialProfiles, setSocialProfiles] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles();
  const {t} = useTranslation();
  const Styles = GlobalStyle();

  let result;
  return (
    <>
      <View style={styles.BoxStyle}>
        <CardHeader item={item} navigation={navigation} />
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => {
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
            }}>
            <View style={[Styles.flexCenter, Styles.flexDirectionRow]}>
              <Text lines={1} color={colors.TextColor} style={styles.font}>
                {t('products')}:{' '}
              </Text>
              <Text style={styles.font}>{item.products}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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
            <View style={[Styles.flex3End, Styles.flexDirectionRow]}>
              <Text lines={1} color={colors.TextColor} style={styles.font}>
                {t('orders')}:{' '}
              </Text>
              <Text style={styles.font}>{item.orders}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity
            onPress={() => {
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
            }}>
            <View style={[Styles.flexCenter, Styles.flexDirectionRow]}>
              <Text lines={1} color={colors.TextColor} style={styles.font}>
                {t('members')}:{' '}
              </Text>
              <View style={styles.memberStyles}>
                <Image style={styles.member1} source={DemoUser} />
                <Image style={styles.member2} source={Demo1} />
                <Image style={styles.member3} source={Demo2} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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
            }}>
            <View style={[Styles.flex3End, Styles.flexDirectionRow]}>
              <Text
                lines={1}
                color={colors.TextColor}
                style={(styles.L8, styles.font)}>
                {t('shippers')}:
              </Text>
              <View style={styles.shipperStyle}>
                <Image style={styles.shipper1} source={MNP} />
                <Image style={styles.shipper2} source={TCS} />
                <Image style={styles.shipper3} source={TRAX} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[Styles.Centered, Styles.w100, Styles.pV5]}>
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
                  <Feather name="chevron-up" size={25} style={styles.border} />
                ) : (
                  <Feather
                    name="chevron-down"
                    size={25}
                    style={styles.border}
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
                item.social_profiles.map((i, key) => {
                  const name2 = i.name;
                  result = name2.slice(0, 5) + '...';
                  return (
                    <>
                      <SocialProfileShow i={i} result={result} key={i.id} />
                    </>
                  );
                })
              ) : (
                <View style={styles.pb10}>
                  <Text>No Social Profile Added</Text>
                </View>
              )}
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default WorkspaceListItem;

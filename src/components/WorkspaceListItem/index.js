import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {Colors, GlobalStyle, Text} from '../../styles';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {DemoUser, Demo1, Demo2, TCS, MNP, TRAX} from '../../utils/imagesPath';
import {Routes} from '../../utils/constants';
import SocialProfileShow from './socialProfileShow';
import CardHeader from './cardHeader';
import {setWorkspace} from '../../config/authSettings';
const WorkspaceListItem = props => {
  const {item, navigation} = props;
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = useStyles();
  const {t} = useTranslation();
  const Styles = GlobalStyle();

  let result;
  const navigateTo = screen => {
    setWorkspace(item);
    dispatch(SetWorkspace(item));
    navigation.navigate(Routes.WORKSPACE, {
      screen: Routes.BOTTOMTAB,
      params: {
        screen: screen,
        params: {
          screen: screen,
          params: {
            workspaceId: item.workspace.id,
          },
        },
      },
    });
  };
  return (
    <View style={styles.BoxStyle}>
      <CardHeader item={item} navigateTo={navigateTo} />
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={() => {
            navigateTo(Routes.PRODUCTS);
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
            navigateTo(Routes.ORDERS);
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
            setWorkspace(item);
            navigation.navigate(Routes.WORKSPACE, {
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
            setWorkspace(item);
            navigation.navigate(Routes.WORKSPACE, {
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
              style={[styles.L8, styles.font]}>
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
        <View
          style={[
            Styles.DisplayFlex,
            Styles.flexDirectionRow,
            Styles.justifyContentSpaceBetween,
            Styles.w100,
          ]}>
          <Text lines={1} color={Colors.WHITE} style={styles.socialProductText}>
            {props.item.product_details}
          </Text>
        </View>
        <View style={styles.socialView}>
          {item && item.social_profiles && item.social_profiles.length > 0 ? (
            item.social_profiles.map((i, key) => {
              const name2 = i.name;
              result = name2.slice(0, 5) + '...';
              return (
                <SocialProfileShow
                  i={i}
                  result={result}
                  item={item}
                  navigation={navigation}
                  key={i.id}
                />
              );
            })
          ) : (
            <View>
              <Text size={12}>No Social Profile Added</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default WorkspaceListItem;

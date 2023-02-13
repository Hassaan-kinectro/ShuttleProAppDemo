import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularImage from '../CircularImage';
import {GlobalStyle, Mixins} from '../../styles';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {Routes} from '../../utils/constants';

const CardHeader = ({item, navigation}) => {
  let workspaceName = item.workspace.name;
  let workspaceIcon = item.workspace.icon.thumb.url;
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.container}>
        <View style={Styles.flexCenter}>
          <TouchableOpacity
            onPress={() => {
              dispatch(SetWorkspace(item));
              navigation.navigate(Routes.WORKSPACE, {
                screen: Routes.BOTTOMTAB,
                params: {
                  screen: Routes.ORDERS,
                  params: {
                    workspaceId: item.workspace.id,
                  },
                },
              });
            }}>
            <CircularImage
              img={workspaceIcon}
              name={workspaceName}
              style={styles.HeaderImage}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.flex2Start}>
          <TouchableOpacity
            onPress={() => {
              dispatch(SetWorkspace(item));
              navigation.navigate(Routes.WORKSPACE, {
                screen: Routes.BOTTOMTAB,
                params: {
                  screen: Routes.ORDERS,
                  params: {
                    workspaceId: item.workspace.id,
                  },
                },
              });
            }}>
            <Text
              lines={1}
              size={Mixins.scaleFont(16)}
              style={[styles.headerText]}>
              {workspaceName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.flex3End}>
          <TouchableOpacity>
            <F5Icon
              name={'ellipsis-v'}
              size={20}
              style={{color: colors.TextColor}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CardHeader;

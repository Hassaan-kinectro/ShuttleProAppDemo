import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularImage from '../CircularImage';
import {GlobalStyle, Mixins} from '../../styles';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import F5Icon from 'react-native-vector-icons/FontAwesome5';

const CardHeader = ({item}) => {
  let workspaceName = item.workspace.name;
  let workspaceIcon = item.workspace.icon.thumb.url;
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const styles = useStyles();
  return (
    <>
      <View style={styles.container}>
        <View style={Styles.flexCenter}>
          <CircularImage
            img={workspaceIcon}
            name={workspaceName}
            style={styles.HeaderImage}
          />
        </View>
        <View style={Styles.flex2Start}>
          <Text
            numberOfLines={2}
            size={Mixins.scaleFont(16)}
            style={[styles.headerText]}>
            {workspaceName}
          </Text>
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

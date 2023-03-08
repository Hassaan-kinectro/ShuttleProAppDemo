import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {startCase} from 'lodash';
import {useTheme} from '@react-navigation/native';
import {CircleCheckIcon} from '../../icons';
import {Styles, Text} from '../../styles';
import {FONT_FAMILY} from '../../utils/constants';
import useStyles from './styles';
import {getDate, NotificationIcon} from './helper';
const NotitficationListItem = ({item, onPress, markAsRead}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const Icon = NotificationIcon(item.type) || null;
  return (
    <View style={styles.container}>
      <View style={Styles.flexDirectionRow}>
        <TouchableOpacity onPress={() => onPress(item)} style={styles.wrapper}>
          <View style={styles.leftContainer}>
            <View style={styles.box}>
              {Icon ? (
                <Icon.icon color={colors.fontPrimary} size={Icon.size} />
              ) : (
                <Text fontFamily={FONT_FAMILY.SEMI_BOLD}>
                  {item.type.substr(0, 1).toUpperCase()}
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.centerContainer]}>
            <Text size={12} lines={3}>
              {item.message}
            </Text>
            <View style={[Styles.flexDirectionRow, Styles.pT5]}>
              <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD}>
                Type:
              </Text>
              <Text size={12} style={styles.typeText}>
                {startCase(item.type)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.clearIconBox}
            disabled={item.isRead}
            onPress={() => markAsRead(item)}>
            {!item.isRead ? (
              <CircleCheckIcon size={16} style={styles.icon} />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hairLine} />
      <View style={[Styles.flexDirectionRow]}>
        <View style={styles.halfContainer}>
          <Text fontFamily={FONT_FAMILY.BOLD} color={colors.fontPrimary}>
            {item.workspaceName}
          </Text>
        </View>
        <View style={[styles.halfContainer, styles.flexCenterEnd]}>
          <Text size={12}>{getDate(item.createdAt)}</Text>
        </View>
      </View>
    </View>
  );
};
export default NotitficationListItem;

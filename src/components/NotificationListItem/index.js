import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CloseIcon} from '../../icons';
import {Text} from '../../styles';
import useStyles from './styles';
const NotitficationListItem = ({item}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftContainer}>
        <View style={styles.box}>
          <Text>{item.type.substr(0, 1).toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text lines={3}>{item.message} </Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.clearIconBox}>
          <CloseIcon size={22} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NotitficationListItem;

import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {openDialScreen} from './helper';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import moment from 'moment';
// import HTMLView from 'react-native-htmlview';
import ActivitySelector from '../ActivitySelector';
import {Badge, Line, RedBadge} from '../../utils/imagesPath';

const RowItem = ({item, contact}) => {
  const [visibleActivitySelector, setActivityVisibilitySelector] =
    React.useState(false);
  const [visibleActivity, setActivityVisibility] = React.useState(false);

  const ActivitySelectorModelClose = React.useCallback(() => {
    setActivityVisibilitySelector(false);
  }, []);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, []);
  const ShowActivitySelectorModal = React.useCallback(() => {
    setActivityVisibilitySelector(true);
  }, []);
  const OpenActivity = () => {
    openDialScreen(contact);
    ShowActivityModal();
  };
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Image
          source={item && item.status === 'success' ? Badge : RedBadge}
          style={styles.image}
        />
        <Image source={Line} style={styles.width} />
      </View>
      <View style={[styles.boxContainer]}>
        <View>
          <View>
            <Text numberOfLines={1} style={styles.text}>
              {item.createdAt
                ? moment(item.createdAt).format('DD MMM YYYY | hh:mm')
                : moment(item.created_at).format('YYYY-MM-DD hh:mm')}
            </Text>
          </View>
          {item.status_value && (
            <View style={[styles.fieldWidth]}>
              <Text numberOfLines={8} style={styles.status}>
                {item.status_value}
              </Text>
            </View>
          )}
          {item.message && (
            <View style={[styles.fieldWidth]}>
              <Text numberOfLines={10} style={[styles.mB5, styles.status]}>
                {/* <HTMLView value={item.message} stylesheet={styles} /> */}
                {item.message}
              </Text>
            </View>
          )}
          {contact && contact !== undefined && (
            <View style={[styles.fieldWidth]}>
              <TouchableOpacity
                onPress={() => {
                  ShowActivitySelectorModal();
                }}>
                <Text numberOfLines={1} style={[styles.mB5, styles.status]}>
                  {contact}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <ActivitySelector
            visible={visibleActivitySelector}
            setVisibility={ActivitySelectorModelClose}
            openActivity={OpenActivity}
            activity={visibleActivity}
          />
        </View>
      </View>
    </View>
  );
};
export default RowItem;

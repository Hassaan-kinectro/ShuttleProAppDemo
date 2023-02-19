import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import useStyles from './styles';
import {Text} from '../../../styles';
import {DateFormat} from '../../../utils/constants';

const tabs = [
  {id: 'day', label: 'Day', value: 0},
  {id: 'week', label: 'Week', value: 7},
  {id: 'month', label: 'Month', value: 30},
];
const Tabs = ({filterValues, setFilterValues}) => {
  const styles = useStyles();
  const onTabChange = tab => {
    setFilterValues(prev => {
      return {
        ...prev,
        startDate: dayjs(prev.endDate)
          .subtract(tab.value, 'days')
          .format(DateFormat),
        tab: tab.id,
      };
    });
  };
  return (
    <View style={styles.tabStyle}>
      <View style={styles.tabInnerStyle}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab)}
            style={[
              styles.tabItemStyle,
              filterValues.tab === tab.id && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText &&
                  filterValues.tab === tab.id &&
                  styles.activeText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Tabs;

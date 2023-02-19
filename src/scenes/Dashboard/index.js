import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {Styles} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import CustomHeader from '../../components/CustomHeader';
import {OrderStatistics, OrdersChart, Tabs} from '../../components/Dashboard';
import {DateFormat} from '../../utils/constants';
const Dashboard = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useSelector(state => state.themeChange.theme);
  const [filterValues, setFilterValues] = useState({
    startDate: dayjs().subtract('7', 'days').format(DateFormat),
    endDate: dayjs().format(DateFormat),
    tab: 'week',
  });
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader name={t('dashboard')} navigation={navigation} />
        <FlatList
          data={[0]}
          contentContainerStyle={Styles.pT10}
          keyExtractor={item => item.toString()}
          ListHeaderComponent={() => (
            <Tabs
              filterValues={filterValues}
              setFilterValues={setFilterValues}
            />
          )}
          renderItem={({item, index}) => {
            return (
              <>
                <OrderStatistics
                  date={dayjs(filterValues.endDate)
                    .subtract('1', 'days')
                    .format(DateFormat)}
                  startDate={filterValues.startDate}
                  endDate={filterValues.endDate}
                />
                <OrdersChart
                  startDate={filterValues.startDate}
                  endDate={filterValues.endDate}
                />
              </>
            );
          }}
        />
      </View>
    </Wrapper>
  );
};

export default Dashboard;

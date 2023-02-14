import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text, GlobalStyle} from '../../../styles';
import CombineChart from './chart';
import {useSelector} from 'react-redux';
import {getChartOrders, chartDefaultValue} from '../helper';
// import {
//   DummyXAxis,
//   DummyYAxis,
//   DeliveredDummyChartData,
//   BookedDummyChartData,
// } from './ChartDummyValues';
import {deviceHeight, deviceWidth} from '../../../utils/orientation';

const OrdersHistory = ({startDate, endDate}) => {
  const [chartData, setChartData] = React.useState(chartDefaultValue);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const Styles = GlobalStyle();
  React.useEffect(() => {
    getChartOrders(workspaceId, startDate, endDate, setChartData);
    return () => {
      setChartData(chartDefaultValue);
    };
  }, [workspaceId, startDate, endDate]);
  //   React.useEffect(() => {
  //     // if (props.callType !== 'real') {
  //     setChartData({
  //       yAxis: DummyYAxis,
  //       xAxis: DummyXAxis,
  //       booked: BookedDummyChartData,
  //       delivered: DeliveredDummyChartData,
  //       loading: false,
  //     });
  //     return () => {
  //       setChartData(chartDefaultValue);
  //     };
  //     // }
  //   }, []);
  return (
    <View style={[Styles.mV10, {height: deviceHeight / 2}]}>
      {!chartData.loading && chartData.delivered.length > 0 ? (
        <CombineChart
          key={Math.random().toString(36).slice(2)}
          xAxis={chartData.xAxis}
          yAxis={chartData.yAxis}
          height={deviceHeight / 2.5}
          width={deviceWidth - 2}
          Booked={chartData.booked}
          Delivered={chartData.delivered}
        />
      ) : !chartData.loading ? (
        <View style={Styles.flexCenter}>
          <Text>Record not available</Text>
        </View>
      ) : (
        <View style={Styles.flexCenter}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
export default OrdersHistory;

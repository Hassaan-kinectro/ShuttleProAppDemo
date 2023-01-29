/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Colors, GlobalStyle} from '../../../styles';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {FONT_FAMILY} from '../../../utils/constants';
import RowItem from '../../../components/RowItem';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
import {getData, GetBookedOrderStatus} from './helper';
const OrderTimeline = props => {
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const Styles = GlobalStyle();
  const styles = useStyles();
  const {t} = useTranslation();

  React.useEffect(() => {
    getData(props, setLoading, setOrderDetail, workspace_id);
  }, [props.props.item]);

  return (
    <View style={[Styles.flex, Styles.flexDirectionColumn, styles.ActivityBox]}>
      <View style={[Styles.flex, styles.box]}>
        {loading ? (
          <View style={[Styles.flexCenter]}>
            <Loader />
          </View>
        ) : (
          <ScrollView style={[]}>
            <View style={styles.container1}>
              <View style={styles.container}>
                {orderDetail &&
                orderDetail.checkpoints &&
                orderDetail.checkpoints.length > 0 ? (
                  orderDetail.checkpoints.map(o => (
                    <RowItem key={o.id} item={o} />
                  ))
                ) : (
                  <View
                    style={[
                      Styles.flexCenter,
                      {fontFamily: FONT_FAMILY.REGULAR},
                    ]}>
                    <Text style={styles.fS15}>
                      {t('timeline.not.available')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={() =>
            GetBookedOrderStatus(
              props,
              setLoading,
              setOrderDetail,
              workspace_id,
            )
          }
          style={[Styles.flexCenter, Styles.floatButton]}>
          <MIcon
            style={styles.updateicon}
            name="update"
            size={30}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderTimeline;

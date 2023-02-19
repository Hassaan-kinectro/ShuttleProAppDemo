/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Colors, GlobalStyle} from '../../../styles';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {FONT_FAMILY} from '../../../utils/constants';
import RowItem from '../../../components/RowItem';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
import {getData, GetBookedOrderStatus} from './helper';
import {WarningIcon} from '../../../icons';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const OrderTimeline = props => {
  const {colors} = useTheme();
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
    return () => {
      setOrderDetail({});
    };
  }, [props.props.item]);

  return (
    <View style={[Styles.flexDirectionColumn]}>
      <View style={[Styles.flexCenterEnd, styles.buttonContainerStyle]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.9}}
          colors={['#139A5C', '#3662A8']}
          style={styles.linearGradient}>
          <TouchableOpacity
            onPress={() =>
              GetBookedOrderStatus(
                props,
                setLoading,
                setOrderDetail,
                workspace_id,
              )
            }
            style={[styles.buttonStyle]}>
            <MIcon
              style={styles.updateicon}
              name="update"
              size={22}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={[styles.boxContainer]}>
        {loading ? (
          <View style={[Styles.flexCenter]}>
            <Loader />
          </View>
        ) : (
          <View style={styles.container}>
            {orderDetail &&
            orderDetail.checkpoints &&
            orderDetail.checkpoints.length > 0 ? (
              orderDetail.checkpoints.map(o => <RowItem key={o.id} item={o} />)
            ) : (
              <View style={[Styles.flexCenter]}>
                <WarningIcon
                  color={colors.textColorLight}
                  size={40}
                  style={Styles.pB10}
                />
                <Text fontFamily={FONT_FAMILY.REGULAR} lines={12}>
                  {t('timeline.not.available')}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderTimeline;

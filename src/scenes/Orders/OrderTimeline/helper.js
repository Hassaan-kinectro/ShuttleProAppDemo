import {getOrderDetail, getOrderStatus} from '../../../services/Order';
import {showMessage} from 'react-native-flash-message';
let order_id;

export const getData = async (
  props,
  setLoading,
  setOrderDetail,
  workspace_id,
) => {
  setLoading(true);
  if (props && props.props && props.props.item && props.props.item.id) {
    order_id = JSON.stringify(props.props.item.id);
    getOrderDetail(order_id, workspace_id).then(res => {
      if (res.status === 200) {
        if (res.data) {
          console.log(res.data);
          setOrderDetail(res.data);
        }
      }
      setLoading(false);
    });
  }
};

export const GetBookedOrderStatus = (
  props,
  setLoading,
  setOrderDetail,
  workspace_id,
) => {
  if (props && props.props && props.props.item && props.props.item.id) {
    order_id = props.props.item.id;
    setLoading(true);
    getOrderStatus(workspace_id, order_id).then(res => {
      if (res.status === 200) {
        if (
          res.data &&
          res.data.checkpoints &&
          res.data.checkpoints.length > 0
        ) {
          setOrderDetail(prev => {
            return {
              ...prev,
              checkpoints: res.data.checkpoints,
            };
          });
        }
        showMessage({
          message: '',
          description: res.message,
          type: 'success',
        });
      } else {
        showMessage({
          message: '',
          description: res.message,
          type: 'danger',
        });
      }
    });
    setLoading(false);
  }
};

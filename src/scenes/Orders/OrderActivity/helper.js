import {FetchActivitiesByOrderId} from '../../../services/Activity';

let order_id;
export const getData = (props, setOrderDetail, setLoading, workspace_id) => {
  setLoading(true);
  if (props && props.props && props.props.item && props.props.item.id) {
    order_id = props.props.item.id;
    FetchActivitiesByOrderId(workspace_id, order_id).then(res => {
      if (res.status === 200) {
        if (res && res.data) {
          setOrderDetail(res.data);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  }
};

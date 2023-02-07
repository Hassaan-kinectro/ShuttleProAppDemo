import {getOrderDetail} from '../../../services/Order';

export const getData = async (
  route,
  setLoading,
  setOrderDetail,
  workspace_id,
) => {
  setLoading(true);
  if (route && route.params && route.params.order && route.params.order.id) {
    getOrderDetail(route.params.order.id, workspace_id).then(res => {
      if (res.status === 200) {
        setLoading(false);
        if (res.data) {
          setLoading(false);
          setOrderDetail(res.data);
        }
      }
    });
  }
};

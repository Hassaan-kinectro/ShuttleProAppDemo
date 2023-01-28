import {FetchMailGroups} from '../../services/FetchMailGroup';
import {FetchDescTemplates} from '../../services/DesTemplate';
import {TransformForDropDown} from '../../utils/Parser';
export const handleLoadMore = (
  page,
  sending,
  orders,
  allOrders,
  setLoading,
  setCallStatus,
  offset,
  changePage,
  setOrders,
  orderBy,
) => {
  if (page !== 1 && !sending && orders.length > 0) {
    if (orders.length >= allOrders.length) {
      return false;
    }
    setLoading(true);
    setCallStatus(true);
    setTimeout(() => {
      const totalLength = page * offset;
      changePage(page + 1);
      setOrders(
        orderBy(
          allOrders.slice(
            0,
            totalLength <= allOrders.length ? totalLength : allOrders.length,
          ),
        ),
      );
      setCallStatus(false);
      setLoading(false);
    }, 100);
  }
};

export const onRefresh = async (
  setRefreshing,
  GetOrdersByFilter,
  workspaceId,
  totalFetch,
  filter,
  isArray,
  page,
  offset,
  setOrders,
  orderBy,
  setAllOrders,
) => {
  setRefreshing(true);
  await GetOrdersByFilter(workspaceId, 1, totalFetch, filter)
    .then(res => {
      if (res.status === 200 && isArray(res.data) && res.data.length > 0) {
        let newOrders = res.data;
        const totalLength = page * offset;
        setOrders(
          orderBy(
            newOrders.slice(
              0,
              totalLength <= newOrders.length ? totalLength : newOrders.length,
            ),
          ),
        );
        setAllOrders(newOrders);
      } else {
      }
    })
    .catch(err => {
      console.log(err);
    });
  setRefreshing(false);
};

export const getRecord = async (
  setEmailTemplates,
  setRecipientGroup,
  workspaceId,
) => {
  await FetchDescTemplates()
    .then(res => {
      if (res.status === 200) {
        const arr = TransformForDropDown(res.data);
        setEmailTemplates(arr);
      }
    })
    .catch(err => {
      console.log(err);
    });

  FetchMailGroups(workspaceId)
    .then(res => {
      if (res.status === 200) {
        setRecipientGroup(TransformForDropDown(res.data));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

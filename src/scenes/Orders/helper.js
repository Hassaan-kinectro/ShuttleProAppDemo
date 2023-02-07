import {FetchMailGroups} from '../../services/FetchMailGroup';
import {FetchDescTemplates} from '../../services/DesTemplate';
import {TransformForDropDown} from '../../utils/Parser';

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
        console.log(res.data, 'this is description template');
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
        console.log(res.data, 'this is recipientgroup');
        setRecipientGroup(TransformForDropDown(res.data));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

import dayjs from 'dayjs';
import {
  FetchDaysOrderByDate,
  FetchCriticalOrdersByDate,
  FetchReturnOrdersByDate,
  FetchStaticsByDate,
} from '../../services/Dashboard';
import * as Constants from './Constants';
export const statisticsDefaultValue = [
  {
    type: Constants.CRITICAL,
    label: 'Critical Orders',
    color: 'criticalCard',
    loading: true,
    data: [
      {
        label: 'Ready To Return',
        key: 'ready_to_return',
        value: 0,
        statusType: 0,
      },
      {label: 'On Hold', key: 'on_hold', value: 0, statusType: 0},
      {label: 'Queried', key: 'queriedCount', value: 0, statusType: 0},
      {label: 'Important', key: 'important', value: 0, statusType: 0},
    ],
  },
  {
    type: Constants.IN_PROGRESS,
    label: 'InProgress Orders',
    color: 'inProgressCard',
    loading: true,
    data: [
      {
        label: 'Day 1',
        key: 'day_one',
        value: 0,
        statusType: 1,
        start: 1,
        end: 1,
      },
      {
        label: 'Day 2',
        key: 'day_two',
        value: 0,
        statusType: 1,
        start: 2,
        end: 2,
      },
      {
        label: 'Day 3',
        key: 'day_three',
        value: 0,
        statusType: 1,
        start: 3,
        end: 3,
      },
      {
        label: 'Day 7',
        key: 'day_seven',
        value: 0,
        statusType: 1,
        start: 8,
        end: 4,
      },
    ],
  },
  {
    type: Constants.RETURNED,
    label: 'Returned Orders',
    color: 'returnCard',
    loading: true,
    data: [
      {label: 'Total Orders', key: 'Total', value: 0, statusType: 0},
      {label: 'Returend', key: 'Returned', value: 0, statusType: 0},
      {
        label: 'Pending Return',
        key: 'Pending_Return',
        value: 0,
        statusType: 0,
      },
      {label: 'Queried', key: 'queriedCount', value: 0, statusType: 0},
    ],
  },
];
export const chartDefaultValue = {
  yAxis: [],
  xAxis: [],
  booked: [],
  delivered: [],
  loading: true,
};
const getInProgressValue = (data, status) => {
  const val = data.find(d => d.status === status);
  return val ? val.value : 0;
};
const getDayValues = (data, values) => {
  data.map(day => {
    if (values[day.key] && values[day.key].length > 0) {
      day.value = getInProgressValue(values[day.key], 1) || 0;
    }
    return null;
  });
  return data;
};
const setLoading = (loading, type, setData) => {
  setData(prev => {
    return prev.map(p => (p.type === type ? {...p, loading: loading} : p));
  });
};
export const fetchDaysOrders = async (workspaceId, date, setData) => {
  setLoading(true, Constants.IN_PROGRESS, setData);
  const resp = await FetchDaysOrderByDate(workspaceId, date, date);
  if (resp.status === 200) {
    if (resp.data) {
      setData(prev => {
        return prev.map(p =>
          p.type === Constants.IN_PROGRESS
            ? {
                ...p,
                data: getDayValues(p.data, resp.data),
              }
            : p,
        );
      });
    }
  }
  setLoading(false, Constants.IN_PROGRESS, setData);
};
const getCriticalValues = (data, values, queriedCount) => {
  data.map(day => {
    if (values[day.key]) {
      day.value = values[day.key] || 0;
    }
    if (day.key === 'queriedCount') {
      day.value = queriedCount || 0;
    }
    return null;
  });

  return data;
};
export const fetchCriticalOrders = async (
  workspaceId,
  startDate,
  endDate,
  setData,
) => {
  setLoading(true, Constants.CRITICAL, setData);
  const resp = await FetchCriticalOrdersByDate(workspaceId, startDate, endDate);
  if (resp.status === 200) {
    console.log(resp);
    if (resp.data) {
      setData(prev => {
        return prev.map(p =>
          p.type === Constants.CRITICAL
            ? {
                ...p,
                data: getCriticalValues(p.data, resp.data, resp.queriedCount),
              }
            : p,
        );
      });
    }
  }
  setLoading(false, Constants.CRITICAL, setData);
};
const getReturnValues = (data, values, queriedCount) => {
  data.map(day => {
    console.log(values[day.key]);
    if (values[day.key] && values[day.key].count) {
      day.value = values[day.key].count || 0;
    }
    if (values[day.key] && values[day.key].status_type_id) {
      day.statusType = values[day.key].status_type_id || 0;
    }
    if (day.key === 'queriedCount') {
      day.value = queriedCount || 0;
    }
    return null;
  });

  return data;
};
export const fetchReturnOrders = async (
  workspaceId,
  startDate,
  endDate,
  setData,
) => {
  setLoading(true, Constants.RETURNED, setData);
  const resp = await FetchReturnOrdersByDate(workspaceId, startDate, endDate);
  if (resp.status === 200) {
    if (resp.data) {
      setData(prev => {
        return prev.map(p =>
          p.type === Constants.RETURNED
            ? {
                ...p,
                data: getReturnValues(p.data, resp.data, resp.queriedCount),
              }
            : p,
        );
      });
    }
  }
  setLoading(false, Constants.RETURNED, setData);
};
const ModifyDataForYAxis = data => {
  const r = [];
  Object.entries(data).forEach(([key, value]) => {
    r.push({y: value});
  });
  return r;
};
const ModifyData = data => {
  const r = [];
  Object.entries(data).forEach(([key, value]) => {
    r.push(value);
  });
  return r;
};
const ModifyDataForXAxis = data => {
  return data.map(d => dayjs(d).format('MMM DD'));
};
export const getChartOrders = async (
  workspaceId,
  startDate,
  endDate,
  setChartData,
) => {
  setChartData(prev => {
    return {...prev, loading: true};
  });
  const resp = await FetchStaticsByDate(workspaceId, startDate, endDate);
  if (resp.status === 200) {
    console.log(resp.data);
    if (resp.data) {
      setChartData(prev => {
        return {...prev, loading: false};
      });
      setChartData({
        xAxis: ModifyDataForXAxis(resp.data.xAxis) || [],
        yAxis: ModifyDataForYAxis(resp.data.orderCount) || [],
        booked: ModifyData(resp.data.amountCount),
        delivered: ModifyData(resp.data.deliveredAmountCount),
        loading: false,
      });
    }
    setChartData(prev => {
      return {...prev, loading: false};
    });
  }
  setChartData(prev => {
    return {...prev, loading: false};
  });
};

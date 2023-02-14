/* eslint-disable prettier/prettier */
import moment from 'moment';
const SevenDayChartDummyData = [
  {label: 'Total', value: 35},
  {label: 'Scheduled', value: 5},
  {label: 'Published', value: 30},
];
const ThreeDayChartDummyData = [
  {label: 'Total', value: 20},
  {label: 'Scheduled', value: 5},
  {label: 'Published', value: 15},
];
const TwoDayChartDummyData = [
  {label: 'Total', value: 16},
  {label: 'Scheduled', value: 4},
  {label: 'Published', value: 12},
];
const OneDayChartDummyData = [
  {label: 'Total', value: 16},
  {label: 'Scheduled', value: 7},
  {label: 'Published', value: 9},
];
const getDates = (startDate, stopDate) => {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
const DummyXAxis = getDates(
  moment().subtract(30, 'days').format('YYYY-MM-DD'),
  moment().format('YYYY-MM-DD'),
);

const DummyYAxis = [
  {y: 8600},
  {y: 4500},
  {y: 2000},
  {y: 5100},
  {y: 4200},
  {y: 78},
  {y: 40},
  {y: 67},
  {y: 30},
  {y: 51},
  {y: 70},
  {y: 34},
  {y: 21},
  {y: 67},
  {y: 49},
  {y: 22},
  {y: 103},
  {y: 27},
  {y: 58},
  {y: 89},
  {y: 72},
  {y: 39},
  {y: 80},
  {y: 47},
  {y: 71},
  {y: 35},
  {y: 48},
  {y: 13},
  {y: 118},
  {y: 66},
  {y: 55},
];
const BookedDummyChartData = [
  2000, 4400, 1505, 8040, 1090, 3050, 2150, 2950, 2600, 2060, 6640, 8900, 3430,
  7770, 5420, 4530, 2320, 2845, 8080, 5520, 1000, 8470, 3430, 7830, 5620, 4410,
  2470, 6430, 7830, 3620, 8410,
];
const DeliveredDummyChartData = [
  1200, 4200, 1100, 6040, 800, 2000, 1000, 2400, 2500, 1960, 5050, 8050, 3400,
  7000, 5250, 4430, 2100, 2645, 7080, 5120, 900, 7470, 3130, 7230, 5120, 3810,
  2070, 5830, 7430, 3520, 6410,
];
const ChartDummyData = [
  {label: 'Total', value: 25},
  {label: 'Scheduled', value: 5},
  {label: 'Published', value: 20},
];
const ActivitiesChartDummyData = [
  {label: 'Confirmation', value: 20},
  {label: 'Follow-up', value: 10},
  {label: 'TCS Complaints', value: 5},
  {label: 'Return Activities', value: 3},
];
const ConfirmationChartDummyData = [
  {label: 'Total', value: 10},
  {label: 'Scheduled', value: 3},
  {label: 'Published', value: 7},
];
const FollowUpChartDummyData = [
  {label: 'Total', value: 5},
  {label: 'Scheduled', value: 2},
  {label: 'Published', value: 3},
];
const TCSComplaintsChartDummyData = [
  {label: 'Total', value: 2},
  {label: 'Scheduled', value: 1},
  {label: 'Published', value: 1},
];
const ReturnActivitiesChartDummyData = [
  {label: 'Delivered', value: 2},
  {label: 'Scheduled', value: 1},
  {label: 'Published', value: 1},
];

export {
  OneDayChartDummyData,
  TwoDayChartDummyData,
  ThreeDayChartDummyData,
  SevenDayChartDummyData,
  DummyXAxis,
  DummyYAxis,
  ChartDummyData,
  BookedDummyChartData,
  DeliveredDummyChartData,
  ActivitiesChartDummyData,
  ConfirmationChartDummyData,
  FollowUpChartDummyData,
  TCSComplaintsChartDummyData,
  ReturnActivitiesChartDummyData,
};

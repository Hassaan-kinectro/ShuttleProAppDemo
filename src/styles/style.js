import {StyleSheet} from 'react-native';
import {deviceWidth, IS_PAD} from '../utils/orientation';
import * as Colors from './colors';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  pH20: {
    paddingHorizontal: 20,
  },
  pH30: {
    paddingHorizontal: 30,
  },
  justifyContentStart: {
    justifyContent: 'flex-start',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  mainWrapper: {
    paddingLeft: IS_PAD ? deviceWidth / 5 : 20,
    paddingRight: IS_PAD ? deviceWidth / 5 : 20,
    paddingVertical: 20,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenterEnd: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flexCenterStart: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexContentEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flex2Start: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flex3End: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loadingBackground: {
    backgroundColor: Colors.BLACK,
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  L8: {
    left: 8,
  },
  pL10: {
    paddingLeft: 10,
  },
  pL5: {
    paddingLeft: 5,
  },
  pL15: {
    paddingLeft: 15,
  },
  pL20: {
    paddingLeft: 20,
  },
  pR10: {
    paddingRight: 10,
  },
  pR5: {
    paddingRight: 5,
  },
  pR15: {
    paddingRight: 15,
  },
  pR20: {
    paddingRight: 20,
  },
  pT10: {
    paddingTop: 10,
  },
  pT5: {
    paddingTop: 5,
  },
  fend: {
    alignSelf: 'flex-end',
  },
  h100: {height: '100%'},
  h10: {height: 10},
  h20: {height: 20},
  h50: {height: '50%'},
  w50: {width: '50%'},
  pV5: {paddingVertical: 5},
  pB10: {paddingBottom: 10},
  pB5: {paddingBottom: 5},
  mT10: {marginTop: 10},
  mT15: {marginTop: 15},
  mT5: {marginTop: 5},
  mB5: {marginBottom: 5},
  mB10: {marginBottom: 10},
  mB15: {marginBottom: 15},
  mB20: {marginBottom: 20},
  mB30: {marginBottom: 30},
  mL10: {marginLeft: 10},
  mV10: {marginVertical: 10},
  mV15: {marginVertical: 15},
  positionRelative: {position: 'relative'},
  rowFlexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  Centered: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  w100: {
    width: '100%',
  },
});
export default styles;

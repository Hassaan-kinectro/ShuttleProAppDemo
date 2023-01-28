import {StyleSheet} from 'react-native';
import {deviceWidth, IS_PAD} from '../utils/orientation';
import * as Colors from './colors';
import * as Mixins from './mixins';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
  primaryBackground: {
    backgroundColor: Colors.PRIMARY_DARK,
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
  loadingBackground: {
    backgroundColor: Colors.BLACK,
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  flexDirectionRow: {
    flexDirection: 'row',
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
  fend: {
    alignSelf: 'flex-end',
  },
  h100: {height: '100%'},
  h50: {height: '50%'},
  w50: {width: '50%'},
  pV5: {paddingVertical: 5},
  pB10: {paddingBottom: 10},
  mT10: {marginTop: 10},
  mT15: {marginTop: 15},
  mT5: {marginTop: 5},
  mB5: {marginBottom: 5},
  mB10: {marginBottom: 10},
  mB15: {marginBottom: 15},
  mB20: {marginBottom: 20},
  mV10: {marginVertical: 10},
  mV15: {marginVertical: 15},
  background_LIGHT_BLACK_2: {backgroundColor: Colors.LIGHT_BLACK_2},
  positionRelative: {position: 'relative'},
  rowFlexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  authButtonMargin: {},
  authButtonWrapper: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 40,
  },
  textCenter: {
    textAlign: 'center',
  },
  authLogo: {
    width: 160,
    height: 150,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 5,
  },
  DrawerLogo: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 5,
  },
  dateInputField: {
    paddingLeft: 5,
    borderWidth: 0,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 10,
  },
  floatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.PRIMARY_1,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  text12Primary_1: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.PRIMARY_1,
  },
  Centered: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  w100: {
    width: '100%',
  },
  InputStyle: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    height: 45,
    borderColor: Colors.PRIMARY_1,
    borderWidth: 1,
  },

  InputErrorStyle: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    height: 45,
    borderColor: Colors.DANGER,
  },

  WorkspaceLogoText: {
    width: 150,
    height: 20,
    marginBottom: 5,
    fontSize: 14,
    color: Colors.PRIMARY_1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dropDownStyle: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  placeholderStyle: {
    color: Colors.GRAY,
  },
  activeLabelStyle: {
    color: Colors.WHITE,
  },
  labelStyle: {
    color: Colors.WHITE,
    paddingLeft: 5,
  },
  itemStyle: {
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_DARK,
    paddingLeft: 10,
    borderRadius: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_1,
    borderRadius: 0,
  },
  containerStyle: {
    height: 45,
    marginBottom: 20,
  },
  activeItemStyle: {
    backgroundColor: Colors.PRIMARY_DARK,
  },
  searchableStyle: {
    height: 40,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
});
export default styles;

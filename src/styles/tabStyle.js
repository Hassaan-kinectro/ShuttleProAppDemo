import {StyleSheet} from 'react-native';

const tabStyles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#258082',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 11.14,
    elevation: 17,
  },
  button: {
    height: 5,
    width: 25,
    backgroundColor: '#258082',
    borderRadius: 5,
    marginTop: 15,
  },
});

export {tabStyles};

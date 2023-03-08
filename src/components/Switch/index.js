import React from 'react';
import {Switch} from 'react-native-switch';
import {useTheme} from '@react-navigation/native';
import {Styles} from '../../styles';
import {scaleFont} from '../../styles/mixins';
const ToggleSwitch = ({
  value = false,
  onChange = () => {},
  activeText = 'On',
  inActiveText = 'Off',
  circleSize = 18,
  circleBorderWidth = 0,
}) => {
  const {colors} = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      disabled={false}
      activeText={activeText}
      inActiveText={inActiveText}
      circleSize={circleSize}
      //   barHeight={barHeight}
      circleBorderWidth={circleBorderWidth}
      backgroundActive={colors.searchIconBackground}
      backgroundInactive={colors.criticalCard}
      circleActiveColor={colors.white}
      circleInActiveColor={colors.white}
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{
        ...Styles.alignItemsCenter,
        ...Styles.justifyContentCenter,
      }} // style for inner animated circle for what you (may) be rendering inside the circle
      switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2.53} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      activeTextStyle={{fontSize: scaleFont(10)}}
      inactiveTextStyle={{fontSize: scaleFont(10)}}
    />
  );
};
export default ToggleSwitch;

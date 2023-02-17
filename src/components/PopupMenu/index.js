// import React from 'react';
// import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, Mixins, Styles, Text} from '../../styles';
import {ThreeDotsIcon} from '../../icons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
const PopUpMenu = ({HeaderAnchor, options = [], onClick = null}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu}>
          {HeaderAnchor ? (
            <HeaderAnchor />
          ) : (
            <ThreeDotsIcon
              size={28}
              color={colors.searchIcon}
              style={Styles.pL5}
            />
          )}
        </TouchableOpacity>
      }
      style={styles.MenuContainer}
      onRequestClose={hideMenu}>
      <ScrollView style={styles.MenuHeight}>
        {options && options.length > 0
          ? options.map((op, i) => (
              <View key={op.label}>
                <MenuItem
                  style={[
                    styles.MenuItemStyle,
                    op.selected && op.selected === true
                      ? styles.MenuItemSelected
                      : {},
                  ]}
                  textStyle={[
                    styles.MenuItemTextStyle,
                    {color: op.disabled ? Colors.GRAY : colors.textColor},
                  ]}
                  onPress={() => {
                    hideMenu();
                    if (onClick) {
                      onClick(op);
                    } else {
                      op.onClick();
                    }
                  }}>
                  {op.icon ? op.icon : null} {op.label}
                </MenuItem>
                {options.length - 1 !== i && (
                  <MenuDivider color={Colors.GRAY} />
                )}
              </View>
            ))
          : null}
      </ScrollView>
      {/* <MenuItem
        style={[styles.MenuItemStyle, styles.MenuItemSelected]}
        textStyle={[styles.MenuItemTextStyle, {color: colors.textColor}]}
        onPress={hideMenu}>
        Menu item 1
      </MenuItem>
      <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
      <MenuItem disabled>Disabled item</MenuItem>
      <MenuDivider />
      <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
    </Menu>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    MenuHeight: {
      maxHeight: 350,
    },
    MenuContainer: {
      backgroundColor: colors.boxColor,
      ...Mixins.boxShadow(Colors.BLACK, {height: 2, width: 0}, 4, 0.5),
    },
    MenuItemStyle: {
      height: 40,
      borderRadius: 3,
      color: colors.textColor,
    },
    MenuItemSelected: {
      backgroundColor: colors.gradient1,
    },
    MenuItemTextStyle: {
      color: Colors.textColor,
      fontSize: Mixins.scaleFont(14),
    },
    arrowButton: {
      backgroundColor: colors.icon,
      height: 22,
      width: 22,
      borderRadius: 3,
      marginTop: 2,
      marginLeft: 15,
    },
    mLeft: {
      //  marginLeft: 10,
    },
    seperator: {
      backgroundColor: colors.background,
      height: 2,
    },
  });
};

export default PopUpMenu;

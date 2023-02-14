// import React from 'react';
// import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
import {Colors, Mixins, Styles, Text} from '../../styles';
import {useTheme} from '@react-navigation/native';
// const PopUpMenu = props => {
//   let menuRef = React.useRef(null);
//   const {colors} = useTheme();
//   const styles = useStyles(colors);
//   const setMenuRef = ref => {
//     menuRef = ref;
//   };
//   const hideMenu = onclick => {
//     menuRef.hide(() => {
//       // console.log('WOW! MENU IS CLOSED!');
//       if (onclick) {
//         onclick();
//       }
//     });
//   };

//   const showMenu = () => {
//     menuRef.show();
//   };
//   return (
//     <>
//       <Menu
//         ref={setMenuRef}
//         button={
//           <TouchableOpacity
//             style={[
//               Styles.alignItemsCenter,
//               Styles.flexDirectionRow,

//               Styles.justifyContentCenter,
//               // styles.mLeft,
//               props.iconType === 'AntDesign' ? styles.arrowButton : {},
//               {...props.style},
//             ]}
//             activeOpacity={0.6}
//             onPress={() => {
//               showMenu();
//             }}>
//             {props.text ? props.text : null}
//             {props.iconType === 'FontAwesome' && (
//               <FIcon
//                 name={props.iconName}
//                 size={props.size || 26}
//                 color={props.color || Colors.GRAYBTN}
//                 //style=
//               />
//             )}
//             {props.iconType === 'FontAwesome5' && (
//               <F5Icon
//                 name={props.iconName}
//                 size={props.size || 26}
//                 color={props.color || Colors.GRAYBTN}
//                 //style=
//               />
//             )}
//             {props.iconType === 'Material' && (
//               <MIcon
//                 name={props.iconName}
//                 size={props.size || 10}
//                 color={props.color || Colors.WHITE}
//               />
//             )}
//             {props.iconType === 'AntDesign' && (
//               <AIcon name={props.iconName} size={10} color={Colors.WHITE} />
//               //   ||
//             )}
//           </TouchableOpacity>
//         }
//         style={styles.MenuContainer}>
//         <ScrollView style={styles.MenuHeight}>
//           {props.options && props.options.length > 0
//             ? props.options.map((op, i) => (
//                 <View key={op.label}>
//                   <MenuItem
//                     style={[
//                       styles.MenuItemStyle,
//                       op.selected && op.selected === true
//                         ? styles.MenuItemSelected
//                         : {},
//                     ]}
//                     textStyle={
//                       (styles.MenuItemTextStyle,
//                       {color: op.disabled ? Colors.GRAY : colors.textColor})
//                     }
//                     onPress={() => {
//                       hideMenu(op.onClick);
//                       // op.onClick();
//                     }}>
//                     {op.icon ? op.icon : null} {op.label}
//                   </MenuItem>
//                   {props.options.length - 1 !== i && (
//                     <MenuDivider color={Colors.GRAY} />
//                   )}
//                 </View>
//               ))
//             : null}
//           {props.subOptions && props.subOptions.length > 0 && (
//             <View style={styles.seperator} />
//           )}
//           {props.subOptions && props.subOptions.length > 0
//             ? props.subOptions.map((op, i) => (
//                 <View key={op.label}>
//                   <MenuItem
//                     style={[
//                       styles.MenuItemStyle,
//                       op.selected && op.selected === true
//                         ? styles.MenuItemSelected
//                         : {},
//                     ]}
//                     textStyle={
//                       (styles.MenuItemTextStyle,
//                       {color: op.disabled ? 'red' : 'pink'})
//                     }
//                     onPress={() => {
//                       hideMenu(op.onClick);
//                     }}>
//                     {op.icon ? op.icon : null} {op.label}
//                   </MenuItem>
//                   {props.subOptions.length - 1 !== i && (
//                     <MenuDivider color={Colors.GRAY} />
//                   )}
//                 </View>
//               ))
//             : null}
//         </ScrollView>
//       </Menu>
//     </>
//   );
// };

import React, {useState} from 'react';

import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
const PopUpMenu = ({HeaderAnchor, options = []}) => {
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
            <MIcon
              name="dots-vertical"
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
                    hideMenu(op.onClick);
                    // op.onClick();
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

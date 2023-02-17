import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, Mixins, Styles, Text} from '../../styles';
import {ThreeDotsIcon} from '../../icons';
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
//         style={styles.menuContainer}>
//         <ScrollView style={styles.menuHeight}>
//           {props.options && props.options.length > 0
//             ? props.options.map((op, i) => (
//                 <View key={op.label}>
//                   <MenuItem
//                     style={[
//                       styles.menuItemStyle,
//                       op.selected && op.selected === true
//                         ? styles.menuItemSelected
//                         : {},
//                     ]}
//                     textStyle={
//                       (styles.menuItemTextStyle,
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
//                       styles.menuItemStyle,
//                       op.selected && op.selected === true
//                         ? styles.menuItemSelected
//                         : {},
//                     ]}
//                     textStyle={
//                       (styles.menuItemTextStyle,
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

import {Menu} from 'react-native-material-menu';
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
            <ThreeDotsIcon
              size={28}
              color={colors.searchIcon}
              style={Styles.pL5}
            />
          )}
        </TouchableOpacity>
      }
      style={styles.menuContainer}
      onRequestClose={hideMenu}>
      <ScrollView style={styles.menuHeight}>
        {options && options.length > 0
          ? options.map((op, i) => (
              <View key={op.label}>
                <TouchableOpacity
                  style={[
                    styles.menuItemStyle,
                    op.selected && op.selected === true
                      ? styles.menuItemSelected
                      : {},
                    options.length - 1 === i && styles.lastItemStyle,
                    i === 0 && styles.firstItemStyle,
                    op.disabled && styles.menuItemDisabled,
                  ]}
                  onPress={() => {
                    op.onClick();
                    hideMenu();
                  }}>
                  {op.icon ? op.icon : null}
                  <Text
                    style={[
                      styles.menuItemTextStyle,
                      op.selected && op.selected === true
                        ? styles.menuItemTextSelected
                        : {},
                      op.disabled && styles.menuItemTextDisabled,
                      op.icon ? Styles.pL10 : null,
                    ]}>
                    {op.label}
                  </Text>
                </TouchableOpacity>
                {options.length - 1 !== i && <View style={styles.divider} />}
              </View>
            ))
          : null}
      </ScrollView>
    </Menu>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    menuHeight: {
      maxHeight: 350,
    },
    menuContainer: {
      backgroundColor: colors.boxColor,
      borderRadius: 20,
      ...Mixins.boxShadow(Colors.BLACK, {height: 2, width: 0}, 4, 0.5),
    },
    menuItemStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      marginHorizontal: 15,
      minWidth: 100,
      borderRadius: 0,
    },
    menuItemSelected: {
      backgroundColor: colors.fontPrimary,
    },
    menuItemDisabled: {},
    lastItemStyle: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    firstItemStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    menuItemTextStyle: {
      color: colors.fontPrimary,
      fontSize: Mixins.scaleFont(14),
    },
    menuItemTextSelected: {
      color: colors.white,
    },
    menuItemTextDisabled: {
      color: colors.loginText,
    },
    arrowButton: {
      backgroundColor: colors.icon,
      height: 22,
      width: 22,
      borderRadius: 3,
      marginTop: 2,
      marginLeft: 15,
    },
    seperator: {
      backgroundColor: colors.background,
      height: 2,
    },
    divider: {
      backgroundColor: colors.boxBorderColor,
      height: 1,
    },
  });
};

export default PopUpMenu;

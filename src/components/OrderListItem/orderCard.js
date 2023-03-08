import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {Text, Mixins, GlobalStyle} from '../../styles';
import {FONT_FAMILY} from '../../utils/constants';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const OrderCard = ({item, OpenActivity}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {t} = useTranslation();
  return (
    <>
      <View style={[styles.container, Styles.flexDirectionRow, styles.pT10]}>
        <View style={[styles.flex2Start]}>
          <Text
            size={12}
            fontFamily={FONT_FAMILY.SEMI_BOLD}
            color={colors.TextColor}>
            {item.customer && item.customer.name ? item.customer.name : 'N/A'}{' '}
          </Text>
        </View>
        <View style={styles.flexMinBox}>
          <Text style={[Styles.mB5, styles.fS10]}>{t('booking.date')}</Text>
        </View>
      </View>
      <View style={[styles.container, Styles.flexDirectionRow, styles.pT5]}>
        {OpenActivity && (
          <View style={[styles.flex2Start]}>
            <TouchableOpacity
              onPress={() => {
                OpenActivity();
              }}>
              <Text
                size={12}
                fontFamily={FONT_FAMILY.SEMI_BOLD}
                style={styles.mT5}>
                {t('ph')} #
                {item.customer && item.customer.contact
                  ? item.customer.contact
                  : 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!OpenActivity && (
          <View style={[styles.flex2Start]}>
            <Text
              size={12}
              fontFamily={FONT_FAMILY.SEMI_BOLD}
              style={styles.mT5}>
              {t('ph')} #
              {item.customer && item.customer.contact
                ? item.customer.contact
                : 'N/A'}
            </Text>
          </View>
        )}

        <View style={styles.flexMinBox}>
          <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD}>
            {moment(item.updated_at).format('DD MMM, YYYY')}
          </Text>
        </View>
      </View>
      <View
        style={[
          Styles.flexDirectionColumn,
          styles.pT10,
          Styles.flex,
          Styles.justifyContentStart,
          Styles.alignItemsStart,
        ]}>
        <View style={[styles.flex2Start]}>
          <Text
            size={Mixins.scaleFont(12)}
            fontFamily={FONT_FAMILY.REGULAR}
            color={colors.TextColor}>
            {t('address')}
          </Text>
        </View>
        <View style={[Styles.flexCenter]}>
          <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD} style={styles.mT5}>
            {item.customer && item.customer.address
              ? item.customer.address
              : 'N/A'}{' '}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderCard;

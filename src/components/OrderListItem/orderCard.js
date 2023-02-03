import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {Text, Mixins, GlobalStyle} from '../../styles';
import {FONT_FAMILY} from '../../utils/constants';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {TransformPrice} from '../../utils/Parser';
const OrderCard = ({props, OpenActivity}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.inline}>
        <View style={[Styles.flex2Start]} />
        <View style={styles.left10}>
          <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD}>
            {props.item.cod_amount
              ? TransformPrice(props.item.cod_amount)
              : 'N/A'}
            .00
          </Text>
        </View>
      </View>
      <View style={[styles.container, Styles.flexDirectionRow, styles.pT10]}>
        <View style={[Styles.flex2Start]}>
          <Text
            size={12}
            fontFamily={FONT_FAMILY.SEMI_BOLD}
            color={colors.TextColor}>
            {props.item.customer && props.item.customer.name
              ? props.item.customer.name
              : 'N/A'}{' '}
          </Text>
        </View>
        <View style={[Styles.flexCenter]}>
          <Text style={[Styles.mB5, styles.fS10]}>{t('booking.date')}</Text>
        </View>
      </View>
      <View style={[styles.container, Styles.flexDirectionRow, styles.pT5]}>
        {OpenActivity && (
          <View style={[Styles.flex2Start]}>
            <TouchableOpacity
              onPress={() => {
                OpenActivity();
              }}>
              <Text
                size={12}
                fontFamily={FONT_FAMILY.SEMI_BOLD}
                style={styles.mT5}>
                {t('ph')} #
                {props.item.customer && props.item.customer.contact
                  ? props.item.customer.contact
                  : 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!OpenActivity && (
          <View style={[Styles.flex2Start]}>
            <Text
              size={12}
              fontFamily={FONT_FAMILY.SEMI_BOLD}
              style={styles.mT5}>
              {t('ph')} #
              {props.item.customer && props.item.customer.contact
                ? props.item.customer.contact
                : 'N/A'}
            </Text>
          </View>
        )}

        <View style={[Styles.flexCenter]}>
          <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD}>
            {moment(props.item.updated_at).format('DD MMM, YYYY')}
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
          Styles.pH20,
        ]}>
        <View style={[Styles.flex2Start]}>
          <Text
            size={Mixins.scaleFont(12)}
            fontFamily={FONT_FAMILY.REGULAR}
            color={colors.TextColor}>
            {t('address')}
          </Text>
        </View>
        <View style={[Styles.flexCenter]}>
          <Text size={12} fontFamily={FONT_FAMILY.SEMI_BOLD} style={styles.mT5}>
            {props.item.customer && props.item.customer.address
              ? props.item.customer.address
              : 'N/A'}{' '}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderCard;

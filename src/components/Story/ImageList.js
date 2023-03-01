/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import ImageGrid from './ImageGrid';
import {GlobalStyle, Text, Mixins} from '../../styles';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {deviceHeight, IS_IOS} from '../../utils/orientation';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../utils/constants';
import StoryModal from '../../scenes/SocialMedia/CreateStory/storyModal';
import {BackArrowIcon} from '../../icons';

const ImageList = ({values, setFieldValue, loading, save}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const numColumns = 3;
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <React.Fragment>
      <FlatList
        data={
          values && values.imagesArr && values.imagesArr.length > 0
            ? values.imagesArr
            : []
        }
        contentContainerStyle={{
          paddingHorizontal: 5,
        }}
        style={{height: IS_IOS ? deviceHeight - 380 : deviceHeight - 350}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={styles.filterStyle}
                  onPress={() => {
                    setFieldValue && setFieldValue('imagesArr', []);
                  }}>
                  <BackArrowIcon
                    size={22}
                    color={colors.searchIcon}
                    style={styles.filterIcon}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Text
                    size={20}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.SEMI_BOLD}
                    lines={1}>
                    Select Story Media
                  </Text>
                  <Text
                    size={10}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.LIGHT}
                    lines={1}
                    style={{top: 5, left: 5}}>
                    (Select Only 10 Images)
                  </Text>
                </View>
              </View>
            </>
          );
        }}
        nestedScrollEnabled={true}
        numColumns={numColumns}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <React.Fragment key={item.id}>
              <ImageGrid
                item={item}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </React.Fragment>
          );
        }}
      />
      <>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.buttonWrapper}>
            {selectedImages.length === 0 ? (
              <View style={styles.buttonContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.9}}
                  colors={['#139A5C', '#3662A8']}
                  style={[styles.linearGradient, {opacity: 0.6}]}>
                  {values.imagesLoading ? (
                    <ActivityIndicator
                      type={'ThreeBounce'}
                      size={30}
                      color={colors.textColorLight}
                    />
                  ) : (
                    <Text
                      size={Mixins.scaleFont(16)}
                      fontFamily={FONT_FAMILY.REGULAR}
                      color={colors.white}
                      style={[styles.buttonText]}>
                      Preview
                    </Text>
                  )}
                </LinearGradient>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.buttonContainer}
                disabled={loading}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.9}}
                  colors={['#139A5C', '#3662A8']}
                  style={styles.linearGradient}>
                  {values.imagesLoading ? (
                    <ActivityIndicator
                      type={'ThreeBounce'}
                      size={30}
                      color={colors.textColorLight}
                    />
                  ) : (
                    <Text
                      size={Mixins.scaleFont(16)}
                      fontFamily={FONT_FAMILY.REGULAR}
                      color={colors.white}
                      style={[styles.buttonText]}>
                      Preview
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
      {modalVisible && (
        <StoryModal
          loading={loading}
          visible={modalVisible}
          setModalVisible={setModalVisible}
          values={values}
          selectedImages={selectedImages}
          FormData={save}
          data={
            selectedImages && selectedImages.length > 0 ? selectedImages : null
          }
        />
      )}
    </React.Fragment>
  );
};

export default ImageList;

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
import {IS_IOS} from '../../utils/orientation';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../utils/constants';
import StoryModal from '../../scenes/SocialMedia/CreateStory/storyModal';

const ImageList = ({values, setFieldValue, loading, save}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const numColumns = 3;
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView>
      <FlatList
        data={
          values && values.imagesArr && values.imagesArr.length > 0
            ? values.imagesArr
            : []
        }
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingBottom: IS_IOS ? 180 : 200,
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginVertical: 20,
                }}>
                <Text
                  size={20}
                  color={colors.TextColor}
                  fontFamily={FONT_FAMILY.SEMI_BOLD}
                  lines={1}>
                  Select Story Media
                </Text>
                <Text
                  size={12}
                  color={colors.TextColor}
                  fontFamily={FONT_FAMILY.LIGHT}
                  lines={1}>
                  (Select Only 10 Images)
                </Text>
              </View>
            </>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 20,
                }}>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    disabled={loading}
                    onPress={() => {
                      setFieldValue && setFieldValue('imagesArr', []);
                    }}>
                    {values.imagesLoading ? (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.9}}
                        colors={['#139A5C', '#3662A8']}
                        style={styles.linearGradient}>
                        <ActivityIndicator
                          type={'ThreeBounce'}
                          size={30}
                          color={colors.textColorLight}
                        />
                      </LinearGradient>
                    ) : (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.9}}
                        colors={['#139A5C', '#3662A8']}
                        style={styles.linearGradient}>
                        <Text
                          size={Mixins.scaleFont(16)}
                          fontFamily={FONT_FAMILY.REGULAR}
                          color={colors.white}
                          style={[styles.buttonText]}>
                          Back
                        </Text>
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    disabled={loading}
                    onPress={() => {
                      setModalVisible(true);
                    }}>
                    {values.imagesLoading ? (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.9}}
                        colors={['#139A5C', '#3662A8']}
                        style={styles.linearGradient}>
                        <ActivityIndicator
                          type={'ThreeBounce'}
                          size={30}
                          color={colors.textColorLight}
                        />
                      </LinearGradient>
                    ) : (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.9}}
                        colors={['#139A5C', '#3662A8']}
                        style={styles.linearGradient}>
                        <Text
                          size={Mixins.scaleFont(16)}
                          fontFamily={FONT_FAMILY.REGULAR}
                          color={colors.white}
                          style={[styles.buttonText]}>
                          Preview
                        </Text>
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
        nestedScrollEnabled={true}
        numColumns={numColumns}
        keyExtractor={index => `${index}`}
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
    </ScrollView>
  );
};

export default ImageList;

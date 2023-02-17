/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React, {useEffect, useRef} from 'react';
import MModal from 'react-native-modal';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  defaultProducts,
  defaultTags,
  defaultCategories,
  getAllProducts,
  getAllTags,
  getAllCategories,
} from '../../scenes/SocialMedia/helper';
import * as Constants from '../../scenes/SocialMedia/Constants';
import Form from './form';
import {Colors, Mixins, Text, GlobalStyle} from '../../styles';
import {deviceHeight, IS_IOS} from '../../utils/orientation';
import {useHeaderHeight} from '@react-navigation/elements';
import Wrapper from '../Wrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import FlashMessage from 'react-native-flash-message';
import ImageList from './ImageList';
import {useTheme} from '@react-navigation/native';
import {CloseIcon} from '../../icons';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../utils/imagesPath';
import {scaleSize} from '../../styles/mixins';
import {showMessage} from 'react-native-flash-message';
import {
  StorySchema,
  initialValues,
  saveStory,
  onClickLoadMedia,
} from './helper';
import useStyles from './styles';

const Story = props => {
  const {loading, closeModal, currentProfile, visible, type} = props;

  const [products, setProducts] = React.useState(defaultProducts);
  const [tags, setTags] = React.useState(defaultTags);
  const [categories, setCategories] = React.useState(defaultCategories);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const theme = useSelector(state => state.themeChange.theme);
  const userId = useSelector(state => state.user.user.id);
  console.log(userId);
  useEffect(() => {
    Promise.all([
      getAllProducts(setProducts, workspaceId),
      getAllTags(setTags, workspaceId),
      getAllCategories(setCategories, workspaceId),
    ]);
  }, []);

  const [reset, setReset] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const headerHeight = useHeaderHeight();
  const flashBox = useRef(null);
  useEffect(() => {
    // setLoading(false);
    setReset(false);
  }, [props.visible]);

  const onModalClose = () => {
    props.setVisibility(false);
    setReset(true);
  };

  return (
    <MModal
      isVisible={visible}
      animationOutTiming={100}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.8}
      style={styles.modal}
      onBackdropPress={onModalClose}
      onSwipeComplete={onModalClose}
      onBackButtonPress={onModalClose}
      swipeThreshold={150}
      deviceHeight={deviceHeight}
      swipeDirection={['bottom']}>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View
          style={[
            Styles.flex,
            {
              justifyContent: 'center',
              marginVertical: 30,
            },
          ]}>
          <View
            style={[
              {
                marginTop: IS_IOS ? scaleSize(50) : 0,
              },
              Styles.flexDirectionRow,
              Styles.justifyContentSpaceBetween,
              {
                paddingHorizontal: 20,
                paddingVertical: 20,
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Raleway',
                fontWeight: '600',
                fontStyle: 'normal',
              }}
              size={Mixins.scaleFont(20)}>
              Create Story
            </Text>
            <TouchableOpacity onPress={onModalClose}>
              <CloseIcon size={24} color={Colors.DANGER} />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={[
              {
                minHeight: deviceHeight - headerHeight - 50,
              },
              ,
            ]}
            keyboardShouldPersistTaps={'handled'}>
            <Formik
              initialValues={initialValues}
              validationSchema={StorySchema}
              onSubmit={(values, handles) => {
                saveStory(values, handles, closeModal);
              }}>
              {p => {
                const {
                  touched,
                  errors,
                  values,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                } = p;
                return (
                  <>
                    <View
                      style={[
                        Styles.flex,
                        {
                          paddingHorizontal: scaleSize(25),
                          paddingVertical: scaleSize(10),
                        },
                      ]}>
                      <>
                        <Form
                          visible={visible}
                          touched={touched}
                          values={values}
                          errors={errors}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          setFieldValue={setFieldValue}
                          reset={reset}
                          products={products}
                          tags={tags}
                          categories={categories}
                          currentProfile={currentProfile}
                          type={type}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={loading}
                            style={[
                              Styles.alignItemsCenter,
                              Styles.justifyContentCenter,
                              styles.addActivity,
                            ]}>
                            {!loading && (
                              <Text
                                size={Mixins.scaleFont(16)}
                                color={Colors.WHITE}
                                style={[
                                  {
                                    paddingRight: loading ? 15 : 0,
                                  },
                                ]}>
                                ADD Story
                              </Text>
                            )}
                            {loading && (
                              <ActivityIndicator
                                type={'ThreeBounce'}
                                size={30}
                                color={colors.textColorLight}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              onClickLoadMedia(
                                values,
                                setFieldValue,
                                workspaceId,
                              );
                            }}
                            disabled={loading}
                            style={[
                              Styles.alignItemsCenter,
                              Styles.justifyContentCenter,
                              styles.addActivity,
                            ]}>
                            {values.imagesLoading ? (
                              <ActivityIndicator
                                type={'ThreeBounce'}
                                size={30}
                                color={colors.textColorLight}
                              />
                            ) : (
                              <Text
                                size={Mixins.scaleFont(16)}
                                color={Colors.WHITE}
                                style={[
                                  {
                                    paddingRight: loading ? 15 : 0,
                                  },
                                ]}>
                                Load Images
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                        {values &&
                          !values.isPreview &&
                          values.imagesArr &&
                          values.imagesArr.length > 0 && (
                            <ImageList
                              setVisibility={props.setVisibility}
                              setReset={setReset}
                              visible={visible}
                              values={values}
                              setFieldValue={setFieldValue}
                              loading={loading}
                            />
                          )}
                      </>
                    </View>
                  </>
                );
              }}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
        <FlashMessage ref={flashBox} position="top" />
      </Wrapper>
    </MModal>
  );
};

export default Story;

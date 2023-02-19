/* eslint-disable no-lone-blocks */
/* eslint-disable no-sequences */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {View, ActivityIndicator, TouchableOpacity} from 'react-native';
import React from 'react';
import {scaleSize} from '../../../styles/mixins';
import CustomHeader from '../../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../../utils/imagesPath';
import Wrapper from '../../../components/Wrapper';
import useStyles from '../styles';
import {FONT_FAMILY} from '../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {GlobalStyle, Mixins, Colors, Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import Form from '../../../components/Story/form';
import ImageList from '../../../components/Story/ImageList';
import {
  StorySchema,
  initialValues,
  saveStory,
  onClickLoadMedia,
} from './helper';
import {
  defaultProducts,
  defaultTags,
  defaultCategories,
  getAllProducts,
  getAllTags,
  getAllCategories,
} from '../helper';

const CreateStory = props => {
  const {navigation, route, type} = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Create Stories';
  const Styles = GlobalStyle();
  const [products, setProducts] = React.useState(defaultProducts);
  const [tags, setTags] = React.useState(defaultTags);
  const [categories, setCategories] = React.useState(defaultCategories);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const theme = useSelector(state => state.themeChange.theme);
  const userId = useSelector(state => state.user?.user?.id);
  console.log(userId);
  React.useEffect(() => {
    Promise.all([
      getAllProducts(setProducts, workspaceId),
      getAllTags(setTags, workspaceId),
      getAllCategories(setCategories, workspaceId),
    ]);
  }, []);

  const saveData = async (values, selectedImages = []) => {
    const data = await saveStory(values, selectedImages);
    console.log(data, 'response');
  };

  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
          <View style={styles.BoxStyle}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
              <Formik
                initialValues={initialValues}
                validationSchema={StorySchema}
                onSubmit={(values, handles) => {
                  saveData(values);
                }}>
                {p => {
                  const {touched, errors, values, handleChange, setFieldValue} =
                    p;
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
                          {values &&
                          !values.isPreview &&
                          values.imagesArr &&
                          values.imagesArr.length > 0 ? (
                            <>
                              <ImageList
                                values={values}
                                setFieldValue={setFieldValue}
                                loading={
                                  route && route.params && route.params.loading
                                }
                                save={saveData}
                              />
                            </>
                          ) : (
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
                                  Instagram Story
                                </Text>
                              </View>
                              <Form
                                touched={touched}
                                values={values}
                                errors={errors}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                products={products}
                                tags={tags}
                                categories={categories}
                                currentProfile={
                                  route &&
                                  route.params &&
                                  route.params.currentProfile
                                }
                                type={type}
                              />
                              {values.date === '' ? (
                                <View style={{marginVertical: 20}}>
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
                                        Load Media
                                      </Text>
                                    </LinearGradient>
                                  )}
                                </View>
                              ) : (
                                <View style={{marginVertical: 20}}>
                                  <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => {
                                      onClickLoadMedia(
                                        values,
                                        setFieldValue,
                                        workspaceId,
                                      );
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
                                          Load Media
                                        </Text>
                                      </LinearGradient>
                                    )}
                                  </TouchableOpacity>
                                </View>
                              )}
                            </>
                          )}
                        </>
                      </View>
                    </>
                  );
                }}
              </Formik>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Wrapper>
    </>
  );
};

export default CreateStory;

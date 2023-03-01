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
import AutoScheduleForm from '../../../components/Story/AutoScheduleForm';
import Radio from '../../../components/RadioButtons';
import ImageList from '../../../components/Story/ImageList';
import AutoSchedularPreview from './autoSchedularPreview';
import {
  StorySchema,
  initialValues,
  saveStory,
  onClickLoadMedia,
  getPostAllSlots,
} from './helper';
import {
  defaultProducts,
  defaultTags,
  defaultCategories,
  getAllProducts,
  getAllTags,
  getAllCategories,
} from '../helper';
import {getUser} from '../../../config/authSettings';

const CreateStory = props => {
  const {navigation, route, type} = props;
  const currentProfile = route && route.params && route.params.currentProfile;
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Create Stories';
  const Styles = GlobalStyle();
  const [products, setProducts] = React.useState(defaultProducts);
  const [tags, setTags] = React.useState(defaultTags);
  const [userId, setUserId] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState('Custom');

  const [categories, setCategories] = React.useState(defaultCategories);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const theme = useSelector(state => state.themeChange.theme);

  React.useEffect(() => {
    getUser().then(async res => {
      if (res) {
        setUserId(res.id);
      }
    });
  }, []);

  React.useEffect(() => {
    Promise.all([
      getAllProducts(setProducts, workspaceId),
      getAllTags(setTags, workspaceId),
      getAllCategories(setCategories, workspaceId),
    ]);
  }, []);

  const saveData = async (values, selectedImages = []) => {
    const data = await saveStory(
      values,
      selectedImages,
      navigation,
      selectedValue,
    );
  };

  const handleRadioChange = value => {
    setSelectedValue(value);
  };
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
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
                    <View style={[Styles.flex, Styles.pH20, Styles.pT10]}>
                      <>
                        {values &&
                        values.imagesArr &&
                        values.imagesArr.length > 0 ? (
                          <>
                            <ImageList
                              values={values}
                              setFieldValue={setFieldValue}
                              save={saveData}
                            />
                          </>
                        ) : values &&
                          values.slots &&
                          values.slots.length > 0 ? (
                          <AutoSchedularPreview
                            values={values}
                            setFieldValue={setFieldValue}
                            save={saveData}
                            currentProfile={currentProfile}
                            userId={userId && userId ? userId : null}
                          />
                        ) : selectedValue === 'Custom' ? (
                          <>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: 20,
                              }}>
                              <View style={styles.radioContainer}>
                                <TouchableOpacity
                                  onPress={() => handleRadioChange('Custom')}>
                                  <Radio
                                    value="Custom"
                                    selected={selectedValue === 'Custom'}
                                  />
                                </TouchableOpacity>
                              </View>
                              <View style={styles.radioContainer}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleRadioChange('Auto Scheduler')
                                  }>
                                  <Radio
                                    value="Auto Scheduler"
                                    selected={
                                      selectedValue === 'Auto Scheduler'
                                    }
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.BoxStyle}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  marginBottom: 10,
                                  marginTop: 5,
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
                                userId={userId && userId ? userId : null}
                                categories={categories}
                                currentProfile={currentProfile}
                                type={type}
                              />
                            </View>
                            {values.date === '' ? (
                              <View style={styles.buttonContainer}>
                                {values.imagesLoading ? (
                                  <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 0, y: 0.9}}
                                    colors={['#139A5C', '#3662A8']}
                                    style={[styles.linearGradient]}>
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
                                    style={[
                                      styles.linearGradient,
                                      {opacity: 0.6},
                                    ]}>
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
                              <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                  if (values.date) {
                                    onClickLoadMedia(
                                      values,
                                      setFieldValue,
                                      workspaceId,
                                    );
                                  }
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
                            )}
                          </>
                        ) : (
                          <>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: 20,
                              }}>
                              <View style={styles.radioContainer}>
                                <TouchableOpacity
                                  onPress={() => handleRadioChange('Custom')}>
                                  <Radio
                                    value="Custom"
                                    selected={selectedValue === 'Custom'}
                                  />
                                </TouchableOpacity>
                              </View>
                              <View style={styles.radioContainer}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleRadioChange('Auto Scheduler')
                                  }>
                                  <Radio
                                    value="Auto Scheduler"
                                    selected={
                                      selectedValue === 'Auto Scheduler'
                                    }
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.BoxStyle}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  marginBottom: 10,
                                  marginTop: 5,
                                }}>
                                <Text
                                  size={20}
                                  color={colors.TextColor}
                                  fontFamily={FONT_FAMILY.SEMI_BOLD}
                                  lines={1}>
                                  Instagram Story
                                </Text>
                              </View>
                              <AutoScheduleForm
                                touched={touched}
                                values={values}
                                errors={errors}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                userId={userId && userId ? userId : null}
                                currentProfile={currentProfile}
                                type={type}
                              />
                            </View>
                            {values.criteria === null ? (
                              <View style={styles.buttonContainer}>
                                {values.slotsLoading ? (
                                  <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 0, y: 0.9}}
                                    colors={['#139A5C', '#3662A8']}
                                    style={[styles.linearGradient]}>
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
                                    style={[
                                      styles.linearGradient,
                                      {opacity: 0.6},
                                    ]}>
                                    <Text
                                      size={Mixins.scaleFont(16)}
                                      fontFamily={FONT_FAMILY.REGULAR}
                                      color={colors.white}
                                      style={[styles.buttonText]}>
                                      Schedule Story
                                    </Text>
                                  </LinearGradient>
                                )}
                              </View>
                            ) : (
                              <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                  if (values.criteria) {
                                    getPostAllSlots(
                                      values,
                                      currentProfile,
                                      setFieldValue,
                                      workspaceId,
                                    );
                                  }
                                }}>
                                {values.slotsLoading ? (
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
                                      Schedule Story
                                    </Text>
                                  </LinearGradient>
                                )}
                              </TouchableOpacity>
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
      </Wrapper>
    </>
  );
};

export default CreateStory;

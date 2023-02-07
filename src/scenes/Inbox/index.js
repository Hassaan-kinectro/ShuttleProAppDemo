/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {View, ScrollView, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../utils/imagesPath';
import Wrapper from '../../components/Wrapper';
import useStyles from './styles';
import StoryRow from '../../components/Story/storyRow';
import {getStories} from './helper';
import Loader from '../../components/Loader';
import {GlobalStyle} from '../../styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
const defaultValue = {id: null, loading: false};
const Inbox = props => {
  const {navigation} = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Stories';
  const Styles = GlobalStyle();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [loading, setLoading] = React.useState(false);
  const [loadingImages, setLoadingImages] = React.useState(defaultValue);
  const [stories, setStories] = React.useState([]);
  React.useEffect(() => {
    getStories(setLoading, setStories, workspaceId);
    return () => {
      setStories([]);
      setLoading(false);
      setLoadingImages(defaultValue);
    };
  }, []);
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
          <ScrollView style={{marginBottom: 80}}>
            {loading ? (
              <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
                {loading && <Loader />}
              </View>
            ) : (
              <View style={styles.BoxStyle}>
                {stories && stories.length > 0 ? (
                  stories.map((item, index) => {
                    return (
                      <React.Fragment key={item.id}>
                        <StoryRow
                          item={item}
                          loading={loadingImages.loading}
                          setLoadingImages={setLoadingImages}
                          disabled={
                            loadingImages.id
                              ? loadingImages.id !== item.id
                              : false
                          }
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <View style={styles.flex}>
                    <AIcon
                      name="warning"
                      color={colors.textColorLight}
                      size={40}
                      style={styles.pB10}
                    />
                    <Text style={styles.text}>No Stories Added</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </Wrapper>
    </>
  );
};

export default Inbox;

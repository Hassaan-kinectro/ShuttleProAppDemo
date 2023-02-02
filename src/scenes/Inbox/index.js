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
const Inbox = props => {
  const [loading, setLoading] = React.useState(false);
  const [stories, setStories] = React.useState([]);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  React.useEffect(() => {
    getStories(setLoading, setStories, workspaceId);
  }, []);
  const {navigation} = props;
  const theme = useSelector(state => state.themeChange.theme);
  const styles = useStyles();
  const {colors} = useTheme();

  const name = 'Stories';
  const Styles = GlobalStyle();

  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
          <ScrollView style={{marginBottom: 80}}>
            {loading ? (
              <View style={[Styles.flexCenter]}>
                <Loader />
              </View>
            ) : (
              <View style={styles.BoxStyle}>
                {stories && stories.length > 0 ? (
                  stories.map((item, index) => {
                    return (
                      <>
                        <StoryRow item={item} />
                      </>
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

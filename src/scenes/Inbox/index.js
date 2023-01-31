import {View, ScrollView} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../utils/imagesPath';
import {statusData} from '../../components/Story/helper';
import Wrapper from '../../components/Wrapper';
import useStyles from './styles';
import StoryRow from '../../components/Story/storyRow';
const Inbox = props => {
  const {navigation} = props;
  const theme = useSelector(state => state.themeChange.theme);

  const styles = useStyles();
  const name = 'Stories';

  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
          <ScrollView style={{marginBottom: 80}}>
            <View style={styles.BoxStyle}>
              {statusData.map((item, index) => {
                return (
                  <>
                    <StoryRow item={item} />
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Wrapper>
    </>
  );
};

export default Inbox;

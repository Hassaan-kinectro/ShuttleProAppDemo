import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Styles, Text} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/constants';
import {defaultWorkspace, getWorkspace} from './helper';
import SocialTabs from './SocialTabs';
import CustomHeader from '../../components/CustomHeader';
import Facebook from './Facebook';
import Instagram from './Instagram';
import DataNotAvailable from './DataNotAvailable';
import Loader from '../../components/Loader';
import PublishedStories from './PublishedStories';
const SocialMediaProfile = props => {
  const styles = useStyles();
  const name = 'Social Profiles';
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const profileId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const navigation = useNavigation();
  const [workspace, setWorkspace] = React.useState(defaultWorkspace);
  const [currentProfile, setCurrentProfile] = React.useState(null);
  React.useEffect(() => {
    getWorkspace(
      workspaceId,
      setWorkspace,
      setCurrentProfile,
      profileId || null,
    );
  }, [workspaceId, profileId]);

  const changeProfile = React.useCallback(profile => {
    setCurrentProfile(profile);
  }, []);

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.Wrapper}>
        <CustomHeader name={name} navigation={navigation} />
        {workspace && workspace.loading && (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            <Loader />
          </View>
        )}
        {!workspace.loading &&
        workspace.data &&
        workspace.data.social_profiles &&
        workspace.data.social_profiles.length > 0 ? (
          <>
            <View style={Styles.flexDirectionRow}>
              <SocialTabs
                workspaceId={workspaceId}
                currentProfile={currentProfile}
                changeProfile={changeProfile}
                socialProfiles={
                  (workspace.data && workspace.data.social_profiles) || []
                }
              />
            </View>
            {currentProfile && currentProfile.profile_type === 'facebook' && (
              <>
                <PublishedStories />
                <Facebook
                  key={currentProfile.page_id}
                  users={workspace.users}
                  currentProfile={currentProfile}
                />
              </>
            )}
            {currentProfile && currentProfile.profile_type === 'instagram' && (
              <>
                <PublishedStories />
                <Instagram
                  key={currentProfile.page_id}
                  users={workspace.users}
                  currentProfile={currentProfile}
                />
              </>
            )}
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.STORY);
              }}>
              <Text> Click for Stories</Text>
            </TouchableOpacity>
            <DataNotAvailable />
          </>
        )}

        {/* {workspace.socialProfile && (
          <AddSocialProfileModal
            open={workspace.socialProfile}
            closeModal={closeSocialModal}
            maxWidth={MD}
            workspaceId={workspaceId}
            modalTitle={t('add.social.profile')}
          />
        )} */}
      </View>
    </Wrapper>
  );
};

export default SocialMediaProfile;

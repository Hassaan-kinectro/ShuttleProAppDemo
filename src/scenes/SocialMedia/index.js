import React from 'react';
import {View} from 'react-native';
import {Styles} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';
import {defaultWorkspace, getWorkspace, postModalDefault} from './helper';
import SocialTabs from './SocialTabs';
import CustomHeader from '../../components/CustomHeader';
import Facebook from './Facebook';
import Instagram from './Instagram';
import DataNotAvailable from './DataNotAvailable';
import Loader from '../../components/Loader';
import PublishedStories from './PublishedStories';

const SocialMediaProfile = ({route, navigation}) => {
  const styles = useStyles();
  const name = 'Social Profiles';
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const [workspace, setWorkspace] = React.useState(defaultWorkspace);
  const [currentProfile, setCurrentProfile] = React.useState(null);
  const [postModals, setPostModals] = React.useState(postModalDefault);

  React.useEffect(() => {
    getWorkspace(workspaceId, setWorkspace, setCurrentProfile, route.params);
  }, [workspaceId, route]);

  const changeProfile = React.useCallback(profile => {
    setCurrentProfile(profile);
  }, []);
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.Wrapper}>
        <CustomHeader name={name} navigation={navigation} />
        {workspace && workspace.loading ? (
          <View style={[Styles.w100, Styles.h50, Styles.Centered]}>
            <Loader />
          </View>
        ) : !workspace.loading &&
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
                  workspace && workspace.data && workspace.data.social_profiles
                }
              />
            </View>
            {currentProfile && currentProfile.profile_type === 'facebook' && (
              <>
                <PublishedStories
                  users={workspace.users}
                  currentProfile={currentProfile}
                  postModals={postModals}
                  setPostModals={setPostModals}
                />
                <Facebook
                  key={currentProfile.page_id}
                  users={workspace.users}
                  currentProfile={currentProfile}
                />
              </>
            )}
            {currentProfile && currentProfile.profile_type === 'instagram' && (
              <>
                <PublishedStories
                  users={workspace.users}
                  currentProfile={currentProfile}
                  postModals={postModals}
                  setPostModals={setPostModals}
                />
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
            <DataNotAvailable />
          </>
        )}
      </View>
    </Wrapper>
  );
};

export default SocialMediaProfile;

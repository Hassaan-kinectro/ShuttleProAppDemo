import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
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
import {FACEBOOK, INSTAGRAM} from '../../utils/constants';
import Facebook from './Facebook';
import Instagram from './Instagram';
import DataNotAvailable from './DataNotAvailable';
const SocialMediaProfile = props => {
  const styles = useStyles();
  const {t} = useTranslation();
  const name = 'Profiles';
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  console.log(workspaceId, 'in the story');
  const profileId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  console.log(profileId, 'in the story');
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
        {workspace.data &&
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
            <View style={styles.hairline} />
            {currentProfile && currentProfile.profile_type === FACEBOOK && (
              <Facebook
                key={currentProfile.page_id}
                users={workspace.users}
                currentProfile={currentProfile}
              />
            )}
            {currentProfile && currentProfile.profile_type === INSTAGRAM && (
              <Instagram
                key={currentProfile.page_id}
                users={workspace.users}
                currentProfile={currentProfile}
              />
            )}
          </>
        ) : (
          <DataNotAvailable />
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

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.STORY);
          }}>
          <Text> Click for Stories</Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default SocialMediaProfile;

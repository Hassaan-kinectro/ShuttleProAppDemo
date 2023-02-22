import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {GlobalStyle, Text} from '../../styles';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import useStyles from './styles';
import {WarningIcon} from '../../icons';
import WorkspaceListItem from '../../components/WorkspaceListItem';
import CustomHeader from '../../components/CustomHeader';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import {onRefresh, getRecord} from './helper';
import Loader from '../../components/Loader';

const Workspace = ({route, navigation}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const {t} = useTranslation();
  const [workspaceList, setWorkspaceList] = useState({
    loading: false,
    data: [],
  });
  const [refresh, setRefresh] = useState(false);
  const theme = useSelector(state => state.themeChange.theme);

  useEffect(() => {
    getRecord(setWorkspaceList);
    return () => {
      setWorkspaceList([]);
    };
  }, []);
  React.useEffect(() => {
    if (route.params && route.params.refresh) {
      setRefresh(route.params.refresh);
      onRefresh(setRefresh, setWorkspaceList);
    }
  }, [route.params]);

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <CustomHeader
        name={t('workspaces')}
        navigation={navigation}
        drawer={false}
      />
      <View
        style={[
          Styles.alignItemsCenter,
          Styles.flexCenter,
          Styles.flatList,
          styles.innerContainer,
        ]}>
        {workspaceList.loading ? (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            {workspaceList.loading && <Loader />}
          </View>
        ) : (
          <FlatList
            data={workspaceList.data}
            extraData={workspaceList.loading}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={40}
            initialNumToRender={40}
            contentContainerStyle={Styles.pT10}
            keyExtractor={(item, index) => `${index}`}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => onRefresh(setRefresh, setWorkspaceList)}
                colors={[colors.background]}
                tintColor={colors.themeIcon}
              />
            }
            onEndReachedThreshold={0.5}
            ListEmptyComponent={() =>
              !workspaceList.loading && workspaceList.data.length === 0 ? (
                <View
                  style={[
                    Styles.flexCenter,
                    {
                      height: (deviceHeight - getFixedHeaderHeight() - 40) / 2,
                    },
                  ]}>
                  <WarningIcon
                    color={colors.textColorLight}
                    size={40}
                    style={Styles.pB10}
                  />
                  <Text
                    numberOfLines={1}
                    color={colors.textColorLight}
                    size={16}>
                    {t('workspaces.not.available')}
                  </Text>
                </View>
              ) : null
            }
            renderItem={({item}) => {
              return (
                <WorkspaceListItem
                  item={item}
                  key={item.id}
                  navigation={navigation}
                />
              );
            }}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default Workspace;

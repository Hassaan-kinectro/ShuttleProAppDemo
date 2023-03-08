/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import useStyles from './styles';
import {View, ActivityIndicator} from 'react-native';
import Share from 'react-native-share';
import {handleConvert} from './helper';
import {FetchStoryById, UpdateStoryById} from '../../services/Stories';
import PopupMenu from '../PopupMenu';
import {Routes} from '../../utils/constants';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';

const defaultValue = {id: null, loading: false};

const StoryRow = ({
  currentProfile,
  navigation,
  handleDelete,
  item,
  loading,
  setLoadingImages,
  disabled,
}) => {
  const styles = useStyles();
  const [imageUrl, setImageUrl] = React.useState([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isloading, SetIsLoading] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const {colors} = useTheme();
  React.useEffect(() => {
    item && item.images && item.images.length > 0 && setImageUrl(item.images);
  }, []);
  const shareInstagramImage = async (urls, id) => {
    setLoadingImages({id: item.id, loading: true});
    SetIsLoading(true);
    await UpdateStoryById(id).then(res => {
      if (res.status === 200) {
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
      }
    });

    const resp = await handleConvert(urls);
    let list = [];
    resp.forEach(async image => {
      list.push(image.image);
    });
    const shareOptions = {
      title: 'Share Images to Instagram',
      failOnCancel: false,
      urls: list,
      type: 'image/*',
      social: Share.Social.INSTAGRAM,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      setLoadingImages(defaultValue);
    } catch (error) {
      setLoadingImages(defaultValue);
    }
  };
  const shareFacebookImage = async (urls, id) => {
    setLoadingImages({id: item.id, loading: true});
    SetIsLoading(true);
    await UpdateStoryById(id).then(res => {
      if (res.status === 200) {
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
      }
    });
    const resp = await handleConvert(urls);
    let list = [];
    resp.forEach(async image => {
      list.push(image.image);
    });
    const shareOptions = {
      title: 'Share Images to Facebook',
      failOnCancel: false,
      urls: list,
      type: 'image/*',
      social: Share.Social.FACEBOOK,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      setLoadingImages(defaultValue);
    } catch (error) {
      setLoadingImages(defaultValue);
    }
  };

  const onClickPublish = (type, id) => {
    SetIsLoading(true);
    if (type === 'instagram') {
      setSelectedItemId(id);
      shareInstagramImage(imageUrl, item.id);
      SetIsLoading(false);
    } else {
      setSelectedItemId(id);
      shareFacebookImage(imageUrl, item.id);
      SetIsLoading(true);
    }
  };
  const onClickDelete = id => {
    setSelectedItemId(id);
    handleDelete(id, setIsDeleting);
  };
  const onClickEdit = async id => {
    SetIsLoading(true);
    setSelectedItemId(id);
    await FetchStoryById(id).then(res => {
      if (res.status === 200) {
        navigation.navigate(Routes.CREATESTORY, {
          data: res.data,
          currentProfile: currentProfile,
          id: id,
        });
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
      }
    });
  };

  const data = [
    {
      label: 'Publish',
      action: 'publish',
      onClick: () => onClickPublish(item && item.type, item.id),
    },
    {
      label: 'Delete',
      action: 'delete',
      onClick: () => onClickDelete(item && item.id),
    },
    {
      label: 'Edit',
      action: 'edit',
      onClick: () => onClickEdit(item && item.id),
    },
  ];

  return (
    <>
      <View key={item && item.status}>
        {item &&
        item.id &&
        (item.type === 'instagram' || item.type === 'facebook') &&
        item.status === 'published' ? (
          <F5Icon
            name="check-double"
            size={20}
            color="green"
            style={{
              width: 20,
              height: 20,
              right: 20,
            }}
          />
        ) : item &&
          item.id &&
          (item.type === 'instagram' || item.type === 'facebook') &&
          item.status === 'pending' ? (
          <MCIcon
            name="progress-check"
            size={20}
            color="green"
            style={{
              width: 20,
              height: 20,
              right: 20,
            }}
          />
        ) : (
          <View style={{right: 20}}>
            {isDeleting || isloading ? (
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.textColorLight}
              />
            ) : (
              <PopupMenu disabled={selectedItemId === item.id} options={data} />
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default StoryRow;

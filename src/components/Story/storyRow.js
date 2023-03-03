/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import useStyles from './styles';
import {View} from 'react-native';
import Share from 'react-native-share';
import {handleConvert} from './helper';
import {FetchStoryById, UpdateStoryById} from '../../services/Stories';
import {useTheme} from '@react-navigation/native';
import {GlobalStyle, Colors} from '../../styles';
import PopupMenu from '../PopupMenu';
import {Routes} from '../../utils/constants';
import {useSelector} from 'react-redux';
const defaultValue = {id: null, loading: false};

const StoryRow = ({
  item,
  setLoadingImages,
  handleDelete,
  navigation,
  currentProfile,
}) => {
  const styles = useStyles();
  const [imageUrl, setImageUrl] = React.useState([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isloading, SetIsLoading] = React.useState(false);
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
      console.log('The response', JSON.stringify(ShareResponse, null, 2));
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
      console.log('The response', JSON.stringify(ShareResponse, null, 2));
      setLoadingImages(defaultValue);
    } catch (error) {
      setLoadingImages(defaultValue);
    }
  };

  const onClickPublish = type => {
    if (type === 'instagram') {
      shareInstagramImage(imageUrl, item.id);
    } else {
      shareFacebookImage(imageUrl, item.id);
    }
  };
  const onClickDelete = () => {
    handleDelete(item.id, setIsDeleting);
  };
  const onClickEdit = async id => {
    console.log(id);
    SetIsLoading(true);
    await FetchStoryById(id).then(res => {
      if (res.status === 200) {
        console.log(res.data, 'in the sresponse');
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
      onClick: () => onClickPublish(item && item.type),
    },
    {
      label: 'Delete',
      action: 'delete',
      onClick: onClickDelete,
    },
    {
      label: 'Edit',
      action: 'edit',
      onClick: () => onClickEdit(item && item.id),
    },
  ];

  return (
    <>
      <View>
        {item &&
        item.id &&
        (item.type === 'instagram' || item.type === 'facebook') &&
        item.status === 'published' ? (
          ''
        ) : item &&
          item.id &&
          (item.type === 'instagram' || item.type === 'facebook') &&
          item.status === 'pending' ? (
          ''
        ) : (
          <PopupMenu options={data} />
        )}
      </View>
    </>
  );
};

export default StoryRow;

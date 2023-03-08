import {
  ProductIcon,
  InstagramIcon,
  SocialIcon,
  StoryIcon,
  GmailIcon,
  CommentIcon,
} from '../../icons';
import moment from 'moment';
import {POST_DATE_TIME} from '../../utils/constants';
const IconList = [
  {type: 'internalComments', icon: CommentIcon, size: 20},
  {type: 'Story', icon: StoryIcon, size: 22},
  {type: 'instagramPost', icon: InstagramIcon, size: 20},
  {type: 'activity', icon: GmailIcon, size: 24},
  {type: 'facebookPost', icon: SocialIcon, size: 20},
  {type: 'facebookDirectMessage', icon: SocialIcon, size: 20},
  {type: 'instagramDirectMessage', icon: InstagramIcon, size: 20},
  {type: 'lowProductInventory', icon: ProductIcon, size: 18},
];
export const NotificationIcon = type => {
  const record = IconList.find(
    i => i.type.toLowerCase() === type.toLowerCase(),
  );
  return record ? record : null;
};
export const getDate = item => {
  return moment(new Date(Number(item) ? Number(item) : item)).format(
    POST_DATE_TIME,
  );
};

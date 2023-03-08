import {gql} from '@apollo/client';
export const GET_FACEBOOK_ALL_POSTS = gql`
  query facebook($workspaceId: Int!, $pageId: String!, $accessToken: String!) {
    facebook(
      workspaceId: $workspaceId
      pageId: $pageId
      accessToken: $accessToken
    ) {
      code
      message
      next
      data {
        type
        pageId
        pageName
        pageLogo
        faceBookPostId
        permalink
        image
        carousel {
          src
          caption
          _id
        }
        date
        workspaceId
        status
        caption
        accessToken
        compressed
        id
        approved
        scheduleId
        postStatus
      }
    }
  }
`;

export const GET_INSTAGRAM_ALL_POSTS = gql`
  query instagram($workspaceId: Int!, $pageId: String!, $accessToken: String!) {
    instagram(
      workspaceId: $workspaceId
      pageId: $pageId
      accessToken: $accessToken
    ) {
      code
      message
      next
      data {
        type
        pageId
        pageName
        pagelogo
        instagramPostId
        permalink
        image
        carousel
        date
        workspaceId
        status
        caption
        createdAt
        updatedAt
        id
        _id
        comments_count
        likes_count
        media_product_type
        media_type
        media_url
        timestamp
        username
        postStatus
        sequenceId
        instaPublishId
        scheduleId
        approved
        owner {
          id
        }
      }
    }
  }
`;
export const GET_NOTIFICATION_UPDATES = gql`
  query getAllNotificationUpdates($userId: String!, $limit: String!) {
    getAllNotificationUpdates(userId: $userId, limit: $limit) {
      _id
      id
      type
      operation
      actionId
      isRead
      workspaceId
      message
      createdAt
      workspaceName
      routes {
        routeType
        id
        query
        queryData
      }
    }
  }
`;

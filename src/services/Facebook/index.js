import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const fetchNextFacebookPosts = async (workspaceId, pageId, next) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post(
      '/socialProfiles/facebook/next/posts',
      {
        workspaceId: workspaceId,
        pageId: pageId,
        next: next,
      },
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const data = response.data;
          return {
            ...responseData,
            status: 200,
            message: response.message,
            next: response.next,
            data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        console.log(response, 'else ran');
        return {
          ...responseData,

          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {fetchNextFacebookPosts};

import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader, getAuthHeaderForFiles} from '../../config/authSettings';
import {isArray, isObject} from 'lodash';
import FormData from 'form-data';

const imageTypes = [
  {type: 'image/jpeg', name: '.jpg'},
  {type: 'image/jpg', name: '.jpg'},
  {type: 'image/png', name: '.png'},
  {type: 'image/tif', name: '.tif'},
];
const getExtension = type => {
  const t = imageTypes.find(m => m.type === type);
  if (t) {
    return t.name;
  }
  return '.jpg';
};

const GetWorkSpaceUser = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();

  return instance
    .get('/workspaces/user', token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        const workspace = isArray(response.data.data)
          ? response.data.data
          : JSON.parse(response.data.data);
        return {
          ...responseData,
          status: 200,
          message: 'Workspaces fetched successfully',
          data: isArray(workspace) ? workspace : [],
        };
      } else {
        return {
          ...responseData,
          status: 400,
          message: 'The workspace not found',
        };
      }
    })
    .catch(err => {
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

const CreateWorkspaces = async (fdata, create = true) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  let token = await getAuthHeaderForFiles();
  const data = new FormData();
  data.append('name', fdata.workspaceName);
  data.append('file', {
    uri: fdata.file.path,
    name: fdata.file.filename
      ? fdata.file.filename
      : Math.random().toString(36).slice(2) + getExtension(fdata.file.mime),
    type: fdata.file.mime,
  });

  if (create) {
    return instance
      .post('/workspaces', data, token)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          response = response.data;
          if (response.code === 200) {
            const workspaces = isArray(response.data)
              ? response.data
              : response.data;
            return {
              ...responseData,
              data: isObject(workspaces) ? workspaces : [],
              status: 200,
              message: 'Workspace Created successfully.',
            };
          } else {
            return {
              ...responseData,
              message: 'Workspace Not Created!',
            };
          }
        } else {
          return {
            ...responseData,
            message: ParseError(response.data),
          };
        }
      })
      .catch(err => {
        return {
          ...responseData,
          message: ParseError(
            err.response && err.response.data ? err.response.data : err.message,
          ),
        };
      });
  }
};

const EditWorkspaces = async (fdata, id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  let token = await getAuthHeaderForFiles();

  return instance
    .put(`/workspaces/${id}`, fdata, token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;

        if (response.code === 200) {
          const workspaces = isArray(response.data)
            ? response.data
            : response.data;

          return {
            ...responseData,
            data: isObject(workspaces) ? workspaces : [],
            status: 200,
            message: 'Workspace Updated Successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Workspace Not Updated!',
          };
        }
      } else {
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {GetWorkSpaceUser, CreateWorkspaces, EditWorkspaces};

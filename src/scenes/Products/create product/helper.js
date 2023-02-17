import {FetchCategoryList} from '../../../services/Categories';
import {FetchTags} from '../../../services/Tags';
import {capitalize} from '../../../utils/Parser/helper';

export const getAllTags = async (tags, setTags, workspaceId) => {
  setTags(prev => {
    return {...prev};
  });
  const resp = await FetchTags(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setTags(prev => {
      return {
        ...prev,
        data: resp.data.map((d, index) => {
          return {
            id: d.id,
            name: d.value ? capitalize(d.value) : '',
            label: d.value ? capitalize(d.value) : '',
          };
        }),
        count: resp.count,
      };
    });
  } else {
    setTags(prev => {
      return {...prev, data: [], count: 0};
    });
  }
};

export const getAllCategories = async (setCategories, workspaceId) => {
  setCategories(prev => {
    return {...prev};
  });
  const resp = await FetchCategoryList(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setCategories(prev => {
      return {
        ...prev,
        data: resp.data.map(d => {
          return {
            id: d.id,
            name: d.name ? capitalize(d.name) : '',
            label: d.name ? capitalize(d.name) : '',
          };
        }),
      };
    });
  } else {
    setCategories(prev => {
      return {...prev, data: [], count: 0};
    });
  }
};

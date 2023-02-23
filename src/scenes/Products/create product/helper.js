import {FetchCategoryList} from '../../../services/Categories';
import {CreateProduct} from '../../../services/CreateProduct';
import {FetchTags} from '../../../services/Tags';
import GetWarehouses from '../../../services/WareHouse';
import {capitalize} from '../../../utils/Parser/helper';
import {getRandomId} from '../../../utils/RandomId';

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
            ...d,
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
            ...d,
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

export const product_variants = {
  index: getRandomId(),
  variant: '',
  sku: '',
  price: '',
  cost_price: '',
  sale_price: '',
  total_quantity: 0,
  variant_quantity: [variant_quantity],
};

export const variant_quantity = {
  id: getRandomId(),
  warehouse: null,
  quantity: '',
  box_no: '',
  shelf_no: '',
  rack_no: '',
};
export const defaultWarehouses = {
  loading: false,
  data: [],
};
export const getAllWarehouses = async (setWarehouses, workspaceId) => {
  setWarehouses(prev => {
    return {...prev, loading: true};
  });
  const resp = await GetWarehouses(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setWarehouses(prev => {
      return {
        ...prev,
        data: resp.data.map(d => {
          return {
            ...d,
            label: d.name ? capitalize(d.name) : '',
          };
        }),
        count: resp.count,
        loading: false,
      };
    });
  } else {
    setWarehouses(prev => {
      return {...prev, data: [], loading: false};
    });
  }
};

export const addNewProduct = async (values, workspaceId) => {
  const resp = await CreateProduct(values, workspaceId);
  console.log(resp, 'rresp data fetch ok');
};

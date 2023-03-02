import _, {isArray, isString, map, toString} from 'lodash';
import {capitalize} from './helper';
export const ParseError = error => {
  let err = 'Something went wrong, Please try again.';
  if (error.errors && isArray(error.errors)) {
    err = error.errors[0];
  } else {
    if (error.errors && isString(error.errors)) {
      err = error.errors;
      console.log(err, 'string');
    }
    if (error.error && isString(error.error)) {
      err = error.error;
      console.log(err, 'string');
    }
    if (error.message && isString(error.message)) {
      err = error.message;
      console.log(err, 'string');
    }
  }
  if (err === 'Invalid login credentials. Please try again.') {
    err = 'Email and password is invalid!';
  }
  return err;
};

export const TransformPrice = (price, country = 'pk') => {
  if (price) {
    return 'RS.' + parseFloat(price).toFixed(0);
  } else {
    return 'N/A';
  }
};

export const TransformForUser = data => {
  return data.map(d => {
    return {
      id: d.id,
      name: d.name ? d.name : d.email,
      label: d.user_name ? d.user_name : d.name ? d.name : d.email,
      value: d.id,
      email: d.email ? d.email : '',
      username: d.user_name ? d.user_name : d.name,
      role: d.role,
    };
  });
};

export const TransformForDropDown = (
  data,
  valueAsLabel = false,
  field = 'name',
) => {
  const list = [];
  map(data, d => {
    if (valueAsLabel) {
      list.push({
        id: d.id,
        label: d[field] ? toString(d[field]) : toString(d.value),
        value: d.id ? d.id : d.value,
      });
    } else {
      list.push(
        Object.assign(d, {
          label: d[field] ? toString(d[field]) : toString(d.value),
          value: d.id ? d.id : d.value,
        }),
      );
    }
  });
  return list;
};

export const descriptionTemplateParser = (data, order = null) => {
  let caption = '';
  let description = data && data.split('~');
  if (description && description.length > 0) {
    description.forEach(desc => {
      if (desc !== null) {
        if (desc[0] === '|') {
          desc = desc.replace('|', '');
          caption = caption + desc + ' ';
        } else if (desc[0] === '[') {
          desc = desc.replace('[', '');
          desc = desc.replace(']', '');
          caption = caption + desc + ' ';
        } else if (desc[0] === '{') {
          desc = desc.replace('{', '');
          desc = desc.replace('}', '');
          caption = caption + desc + ' ';
        } else {
          caption = caption + desc + ' ';
        }
      }
    });
    let da = caption;
    if (order) {
      da = da.replace(
        'Consignment Number|',
        ' ' + order && order.tracking_id
          ? order.tracking_id
          : order.trackingId
          ? order.trackingId
          : '',
      );
      da = da.replace(
        'Customer Name|',
        ' ' + order && order.customer && order.customer.name
          ? capitalize(order.customer.name)
          : '',
      );
      da = da.replace(
        'Customer Address|',
        ' ' + order && order.customer && order.customer.address
          ? capitalize(order.customer.address)
          : '',
      );
      da = da.replace(
        'Customer City|',
        order && order.city && order.city.city_name
          ? capitalize(order.city.city_name)
          : '',
      );
      da = da.replace(
        'Phone Number|',
        ' ' + order && order.customer && order.customer.contact
          ? order.customer.contact
          : '',
      );
      da = da.replace(
        'Last Status|',
        order && order.last_status_value
          ? capitalize(order.last_status_value)
          : order.last_status_value
          ? capitalize(order.last_status_value)
          : '',
      );
    }
    caption = da;
    return caption;
  }
  return description;
};

export const responseData = {
  loading: false,
  status: 210,
  message: 'something.went.wrong',
};

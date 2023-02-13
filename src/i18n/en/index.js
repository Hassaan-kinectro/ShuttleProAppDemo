import messages from './messages.json';
import labels from './labels.json';
import validations from './validations.json';
import common from './common.json';
export const en = {
  translation: {
    ...common,
    ...messages,
    ...validations,
    ...labels,
  },
};

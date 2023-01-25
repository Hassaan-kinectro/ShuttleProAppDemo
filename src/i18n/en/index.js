import messages from './messages.json';
import labels from './labels.json';
import validations from './validations.json';
export const en = {
  translation: {
    ...messages,
    ...validations,
    ...labels,
  },
};

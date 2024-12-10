import { FormType } from '~/types/common.types';

export const getSubmitBtnLabel = (
  isSubmitting: boolean,
  formType: FormType,
) => {
  if (isSubmitting) {
    return formType === 'create' ? 'Creating...' : 'Updating...';
  } else {
    return formType === 'create' ? 'Create' : 'Update';
  }
};

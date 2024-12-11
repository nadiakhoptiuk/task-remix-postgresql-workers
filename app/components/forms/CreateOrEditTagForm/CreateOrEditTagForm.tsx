import { MultiValue } from 'react-select';
import {
  useControlField,
  useIsSubmitting,
  ValidatedForm,
} from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { MultiSelect } from '~/components/ui-kit/MultiSelect';
import { SimpleInput } from '~/components/ui-kit/SimpleInput';

import { tagValidator } from '~/utils/validationSchemas/tagSchema';
import { getSubmitBtnLabel } from '~/utils/uxUtilities/getSubmitBtnLabel';

import { OptionType, TagFormType } from '~/types/common.types';

export const CreateOrUpdateTagForm: React.FC<TagFormType> = ({
  formType,
  users,
  defaultValues,
}) => {
  const [usersListValue, setUsersListValue] = useControlField<
    MultiValue<OptionType>
  >('tag-form', 'users');
  const isSubmitting = useIsSubmitting('tag-form');

  return (
    <ValidatedForm
      validator={tagValidator}
      defaultValues={{ tagName: defaultValues?.name }}
      id="tag-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <SimpleInput name="tagName" label="Tag name:" placeholder="Marketing" />

      <MultiSelect
        name="users"
        value={usersListValue}
        labelText="Users:"
        setValue={setUsersListValue}
        defaultValue={defaultValues?.connectedUsers?.map(
          ({ user: { name, id } }: { user: { name: string; id: number } }) => {
            return { value: String(id), label: name };
          },
        )}
        options={users}
      />

      <SubmitButton isSubmitting={isSubmitting}>
        {getSubmitBtnLabel(isSubmitting, formType)}
      </SubmitButton>
    </ValidatedForm>
  );
};

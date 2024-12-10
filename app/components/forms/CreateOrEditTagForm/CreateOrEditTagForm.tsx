import { MultiValue } from 'react-select';
import { useNavigation } from '@remix-run/react';
import { useControlField, ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';
import { MultiSelect } from '~/components/ui-kit/MultiSelect';

import { tagValidator } from '~/utils/validationSchemas/tagSchema';
import { getSubmitBtnLabel } from '~/utils/uxUtilities/getSubmitBtnLabel';

import { OptionType, TagFormType } from '~/types/common.types';

export const CreateOrUpdateTagForm: React.FC<TagFormType> = ({
  formType,
  users,
  defaultValues,
}) => {
  const [nameValue, setNameValue] = useControlField<string>(
    'tag-form',
    'tagName',
  );
  const [usersListValue, setUsersListValue] = useControlField<
    MultiValue<OptionType>
  >('tag-form', 'users');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <ValidatedForm
      validator={tagValidator}
      id="tag-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="tagName"
        value={nameValue}
        setValue={setNameValue}
        type="text"
        defaultValue={defaultValues?.name}
        labelText="Tag name:"
        placeholder="Marketing"
      />

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

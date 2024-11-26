import { MultiValue } from 'react-select';
import { useControlField, ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';
import { MultiSelect } from '~/components/ui-kit/MultiSelect';

import { tagValidator } from '~/utils/validationSchemas/tagSchema';

import { FormType, OptionType, TagFormType } from '~/types/common.types';

export const CreateOrUpdateTagForm: React.FC<TagFormType & FormType> = ({
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

  return (
    <ValidatedForm
      validator={tagValidator}
      id="tag-form"
      method="post"
      defaultValues={{
        tagName: defaultValues?.name,
        //TODO users:
        //   defaultValues?.connectedUsers &&
        //   defaultValues?.connectedUsers?.length > 0
        //     ? defaultValues?.connectedUsers?.map(({ user: { name, id } }) => {
        //         return { value: String(id), label: name };
        //       })
        //     : [],
      }}
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="tagName"
        value={nameValue}
        setValue={setNameValue}
        type="text"
        labelText="Tag name:"
        placeholder="Marketing"
      />

      <MultiSelect
        name="users"
        value={usersListValue}
        labelText="Users:"
        setValue={setUsersListValue}
        options={users}
      />

      <SubmitButton>{formType === 'create' ? 'Create' : 'Update'}</SubmitButton>
    </ValidatedForm>
  );
};

import { FormType, RoleSelectOption } from '~/types/common.types';

export type EmployeeFormProps = {
  formType: FormType;
  defaultValues?: {
    name: string;
    email: string;
    role: RoleSelectOption;
    password: string;
  };
};

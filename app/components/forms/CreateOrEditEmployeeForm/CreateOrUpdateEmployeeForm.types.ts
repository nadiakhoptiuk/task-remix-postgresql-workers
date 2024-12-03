import { RoleSelectOption } from '~/types/common.types';

export interface EmployeeFormProps {
  formType: 'create' | 'update';
  defaultValues?: {
    name: string;
    email: string;
    role: RoleSelectOption;
    password: string;
  };
}

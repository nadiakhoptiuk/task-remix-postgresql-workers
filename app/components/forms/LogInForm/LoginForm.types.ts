export interface LoginFormProps {
  actionDataErrors:
    | {
        email?: string;
        password?: string;
      }
    | undefined;
}

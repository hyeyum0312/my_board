export type UseLoginFormReturn = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

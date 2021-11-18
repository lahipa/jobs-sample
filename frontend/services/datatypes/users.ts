export interface LoginDataType {
  username: string;
  password: string;
}

export interface UserDataType {
  user?: {
    namer?: string;
    nameu?: string;
    email?: string;
  };
  token?: string;
}

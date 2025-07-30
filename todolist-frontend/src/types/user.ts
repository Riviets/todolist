export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  username: string;
}

export interface User extends UserRegisterData {
  id: number;
}

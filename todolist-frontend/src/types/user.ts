export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  username: string;
}

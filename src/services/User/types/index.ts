export type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

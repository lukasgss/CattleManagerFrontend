import { LoginUserData } from "../../../services/User/types";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthContextData = {
  authenticated: boolean;
  errorMessage: string | null;
  userData: UserData | null;
  handleLogin: (loginData: LoginUserData) => Promise<void>;
  handleLogout: () => void;
};

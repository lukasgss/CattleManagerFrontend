import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { API, ApiError } from "../../services/Api";
import { GetUserData, LoginUser } from "../../services/User";
import { LoginUserData } from "../../services/User/types";
import { AuthContextData, AuthProviderProps, UserData } from "./types";

export const AuthContext = createContext<AuthContextData>({
  authenticated: false,
  errorMessage: null,
  userData: null,
  handleLogin: Object,
  handleLogout: Function,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setAccessToken(null);
    navigate("/");
  };

  const getUserData = async () => {
    const userId = userData?.id ?? localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const { data } = await GetUserData(userId);
      setUserData(data);
    } catch {
      handleLogout();
      navigate("/login");
    }
  };

  const setInitialAppData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setAccessToken(token);
      await getUserData();
    }

    setLoadingApp(false);
  };

  useEffect(() => {
    setInitialAppData();
  }, []);

  const handleLogin = async (loginData: LoginUserData) => {
    try {
      const { data } = await LoginUser(loginData);

      localStorage.setItem("accessToken", JSON.stringify(data.token));
      localStorage.setItem("userId", data.id);
      API.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      navigate("/dashboard");
      setAccessToken(data.token);
      setUserData({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    } catch (e) {
      const err = e as AxiosError<ApiError>;
      const errorMsg =
        err.response?.data && err.response.data.message
          ? err.response.data.message
          : import.meta.env.VITE_GENERIC_ERROR_MESSAGE;
      setErrorMessage(errorMsg);
    }
  };

  const contextData = useMemo(
    () => ({
      authenticated: !!accessToken,
      errorMessage,
      userData,
      handleLogin,
      handleLogout,
    }),
    [accessToken, userData, errorMessage]
  );

  return (
    <AuthContext.Provider value={contextData}>
      {!loadingApp ? children : null}
    </AuthContext.Provider>
  );
};

import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { API, ApiError } from "../services/Api";
import { LoginUser } from "../services/User";
import { LoginUserData } from "../services/User/types";
import { AuthContextData, AuthProviderProps, UserData } from "./types";

export const AuthContext = createContext<AuthContextData>({
  authenticated: false,
  errorMessage: null,
  handleLogin: Object,
  handleLogout: Function,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setAccessToken(token);
    }

    setLoading(false);
  }, []);

  const handleLogin = async (loginData: LoginUserData) => {
    try {
      const { data } = await LoginUser(loginData);

      localStorage.setItem("accessToken", JSON.stringify(data.token));
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    navigate("/");
  };

  const contextData = useMemo(
    () => ({
      authenticated: !!accessToken,
      errorMessage,
      handleLogin,
      handleLogout,
    }),
    [accessToken, userData, errorMessage]
  );

  return (
    <AuthContext.Provider value={contextData}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

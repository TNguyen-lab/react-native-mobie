import React, { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constant";
import * as _unitOfWork from "../api";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const navigator = useNavigate();
  const login = async (dataLogin) => {
    const redirectUrl = localStorage.getItem(STORAGE_KEY.REDIRECTAFTERLOGIN);
    if (redirectUrl) {
      localStorage.removeItem(STORAGE_KEY.REDIRECTAFTERLOGIN);
      navigator(redirectUrl);
    } else {
      navigator("/"); // fallback
    }
    localStorage.setItem(
      STORAGE_KEY.USER,
      JSON.stringify({ ...dataLogin.user }),
    );
    localStorage.setItem(
      STORAGE_KEY.COMPANY,
      JSON.stringify({ ...dataLogin.user.company }),
    );
    localStorage.setItem(STORAGE_KEY.TOKEN, dataLogin.tokens.access.token);
    localStorage.setItem(
      STORAGE_KEY.REFRESH_TOKEN,
      dataLogin.tokens.refresh.token,
    );
    await fetchUserPermission();
    // _unitOfWork.user.updateLastLoginTime();
    // save deviceToken
    var deviceToken = localStorage.getItem(STORAGE_KEY.DEVICE_TOKEN);
    if (deviceToken) {
      let res = await _unitOfWork.user.saveDeviceMobile({
        deviceMobile: {
          deviceToken: deviceToken,
          user: dataLogin.user?.id,
        },
      });
    }
    window.location.reload();
  };
  const fetchUserPermission = async () => {
    let res = await _unitOfWork.user.getPermissisonByUsers();
    if (res && res.code === 1) {
      localStorage.setItem(STORAGE_KEY.PERMISSION, JSON.stringify(res.data));
    }
  };
  const logout = async () => {
    var deviceToken = localStorage.getItem(STORAGE_KEY.DEVICE_TOKEN);
    if (deviceToken) {
      let res = await _unitOfWork.logoutMobile({
        deviceToken: deviceToken,
      });
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEY.BRANCHS);
    localStorage.removeItem(STORAGE_KEY.BRANCH_CHANGE);
    localStorage.removeItem(STORAGE_KEY.COMPANY_SETTING);
    localStorage.removeItem(STORAGE_KEY.FOOTER_ACTIVE);
    localStorage.removeItem(STORAGE_KEY.PERMISSION);
    localStorage.removeItem(STORAGE_KEY.SUSBSCRIPTION_ID);
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    localStorage.removeItem(STORAGE_KEY.USER);
    // localStorage.removeItem(STORAGE_KEY.REDIRECTAFTERLOGIN);
    setToken(null);
    navigator("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    const user = localStorage.getItem(STORAGE_KEY.USER);
    try {
      const userObj = JSON.parse(user);
      // if (token) {
      //   _unitOfWork.user.updateLastLoginTime();
      // }
      setUser(userObj);
    } catch (error) {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY.USER);
    }
    setToken(token || null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: typeof token === "undefined" ? undefined : !!token,
        user,
        login,
        logout,
        token,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

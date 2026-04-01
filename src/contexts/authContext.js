import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { STORAGE_KEY } from "../utils/constant";
import * as _unitOfWork from "../api";
import * as storage from "../api/storage";
import { setUnauthorizedHandler } from "../api/authCallback";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // undefined = still loading, null = not authenticated, string = token
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const segments = useSegments();

  // Auth guard: redirect to login when not authenticated
  useEffect(() => {
    if (token === undefined) return; // still loading
    const onLoginScreen = segments[0] === "login";
    if (!token && !onLoginScreen) {
      router.replace("/login");
    } else if (token && onLoginScreen) {
      router.replace("/");
    }
  }, [token, segments]);

  const fetchUserPermission = async () => {
    try {
      const res = await _unitOfWork.user.getPermissisonByUsers();
      if (res && res.code === 1) {
        await AsyncStorage.setItem(STORAGE_KEY.PERMISSION, JSON.stringify(res.data));
      }
    } catch (_) {}
  };

  const login = async (dataLogin) => {
    const userData = { ...dataLogin.user };
    const accessToken = dataLogin.tokens.access.token;
    const refreshToken = dataLogin.tokens.refresh.token;
    const company = { ...dataLogin.user.company };

    await AsyncStorage.multiSet([
      [STORAGE_KEY.USER, JSON.stringify(userData)],
      [STORAGE_KEY.COMPANY, JSON.stringify(company)],
      [STORAGE_KEY.TOKEN, accessToken],
      [STORAGE_KEY.REFRESH_TOKEN, refreshToken],
    ]);

    storage.setToken(accessToken);
    setToken(accessToken);
    setUser(userData);

    await fetchUserPermission();

    // Save device token if available
    try {
      const deviceToken = await AsyncStorage.getItem(STORAGE_KEY.DEVICE_TOKEN);
      if (deviceToken) {
        await _unitOfWork.user.saveDeviceMobile({
          deviceMobile: {
            deviceToken,
            user: dataLogin.user?.id,
          },
        });
      }
    } catch (_) {}
  };

  const logout = useCallback(async () => {
    try {
      const deviceToken = await AsyncStorage.getItem(STORAGE_KEY.DEVICE_TOKEN);
      if (deviceToken) {
        await _unitOfWork.logoutMobile({ deviceToken });
      }
    } catch (_) {}

    await AsyncStorage.multiRemove([
      STORAGE_KEY.BRANCHS,
      STORAGE_KEY.BRANCH_CHANGE,
      STORAGE_KEY.COMPANY_SETTING,
      STORAGE_KEY.FOOTER_ACTIVE,
      STORAGE_KEY.PERMISSION,
      STORAGE_KEY.TOKEN,
      STORAGE_KEY.REFRESH_TOKEN,
      STORAGE_KEY.USER,
      STORAGE_KEY.COMPANY,
    ]);

    storage.setToken(null);
    setUser(null);
    setToken(null);
    router.replace("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Load persisted auth on startup
  useEffect(() => {
    const loadAuth = async () => {
      try {
        await storage.initStorage();
        const [[, tokenStr], [, userStr]] = await AsyncStorage.multiGet([
          STORAGE_KEY.TOKEN,
          STORAGE_KEY.USER,
        ]);
        const t = tokenStr || null;
        let u = null;
        if (userStr) {
          try {
            u = JSON.parse(userStr);
          } catch (_) {}
        }
        storage.setToken(t);
        setToken(t);
        setUser(u);
      } catch (_) {
        storage.setToken(null);
        setToken(null);
        setUser(null);
      }
    };
    loadAuth();
  }, []);

  // Register 401 handler so API layer can trigger logout
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
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
  return useContext(AuthContext);
}


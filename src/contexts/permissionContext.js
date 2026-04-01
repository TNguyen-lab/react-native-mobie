import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../utils/constant";
import * as _unitOfWork from "../api";
import * as storage from "../api/storage";

const PermissionContext = createContext({});

export const PermissionProvider = ({ children }) => {
  const [branchs, setBranchs] = useState([]);
  const [branchChange, setBranchChange] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      fetchUserPermission();
    }
  }, []);

  const fetchUserPermission = async () => {
    try {
      const res = await _unitOfWork.user.getPermissisonByUsers();
      if (res && res.code === 1) {
        permissionByUser(res.data);
      }
    } catch (_) {}
  };

  const updateBranchs = async (_branchs) => {
    const _branchChange = await AsyncStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    if (!_branchChange) {
      await AsyncStorage.setItem(STORAGE_KEY.BRANCH_CHANGE, "all");
      storage.setBranchChange("all");
      setBranchChange("all");
    } else {
      storage.setBranchChange(_branchChange);
      setBranchChange(_branchChange);
    }
    const branchIds = _branchs.map((_b) => _b.id);
    await AsyncStorage.setItem(STORAGE_KEY.BRANCHS, JSON.stringify(branchIds));
    storage.setBranchs(branchIds);
    setBranchs(_branchs);
  };

  const permissionByUser = async (_permissions) => {
    setPermissions(_permissions);
    await AsyncStorage.setItem(STORAGE_KEY.PERMISSION, JSON.stringify(_permissions));
  };

  return (
    <PermissionContext.Provider
      value={{
        branchs,
        updateBranchs,
        branchChange,
        permissions,
        permissionByUser,
        fetchUserPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export default function usePermission() {
  return useContext(PermissionContext);
}


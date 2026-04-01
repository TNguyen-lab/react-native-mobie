import React, { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constant";
import * as _unitOfWork from "../api";
import { useNavigate } from "react-router-dom";
const PermissionContext = createContext({});

export const PermissionProvider = ({ children }) => {
  const [branchs, setBranchs] = useState([]);
  const [branchChange, setBranchChange] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    if (token) {
      fetchUserPermission();
    }
  }, []);
  const fetchUserPermission = async () => {
    let res = await _unitOfWork.user.getPermissisonByUsers();
    if (res && res.code === 1) {
      permissionByUser(res.data);
    }
  };
  const updateBranchs = (_branchs) => {
    const _branchChange = localStorage.getItem(STORAGE_KEY.BRANCH_CHANGE);
    if (!_branchChange) {
      localStorage.setItem(STORAGE_KEY.BRANCH_CHANGE, "all");
      setBranchChange("all");
    } else {
      setBranchChange(_branchChange);
    }
    localStorage.setItem(
      STORAGE_KEY.BRANCHS,
      JSON.stringify(_branchs.map((_b) => _b.id))
    );
    setBranchs(_branchs);
  };
  const permissionByUser = (_permissions) => {
    setPermissions(_permissions);
    localStorage.setItem(STORAGE_KEY.PERMISSION, JSON.stringify(_permissions));
  };
  return (
    <PermissionContext.Provider
      value={{
        branchs,
        updateBranchs,
        branchChange,
        permissions,
        permissionByUser,
        fetchUserPermission
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export default function usePermission() {
  const context = useContext(PermissionContext);
  return context;
}

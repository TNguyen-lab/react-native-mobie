import React, { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { schedulePreventiveStatus } from "../utils/schedulePreventive.constant";
const SchedulePreventiveTaskContext = createContext({});

export const SchedulePreventiveTaskProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState({ status: schedulePreventiveStatus.new });
  useEffect(() => {
  }, []);
  const updateSearchValue = (_values) => {
    setSearchValue(_values)
  }
  return (
    <SchedulePreventiveTaskContext.Provider
      value={{
        updateSearchValue,
        searchValue
      }}
    >
      {children}
    </SchedulePreventiveTaskContext.Provider>
  );
};

export default function useSchedulePreventiveTaskContext() {
  const context = useContext(SchedulePreventiveTaskContext);
  return context;
}

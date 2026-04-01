import React, { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { schedulePreventiveStatus, schedulePreventiveTicketStatus } from "../utils/schedulePreventive.constant";
const SchedulePreventiveContext = createContext({});

export const SchedulePreventiveProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState({ ticketStatus: schedulePreventiveTicketStatus.new });
  useEffect(() => {
  }, []);
  const updateSearchValue = (_values) => {
    setSearchValue(_values)
  }
  return (
    <SchedulePreventiveContext.Provider
      value={{
        updateSearchValue,
        searchValue
      }}
    >
      {children}
    </SchedulePreventiveContext.Provider>
  );
};

export default function useSchedulePreventiveContext() {
  const context = useContext(SchedulePreventiveContext);
  return context;
}

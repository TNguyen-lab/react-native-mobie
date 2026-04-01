import React, { createContext, useContext, useEffect, useState } from "react";
import { calibrationGroupStatus } from "../utils/calibration.constant";
const CalibrationWorkContext = createContext({});

export const CalibrationGroupProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState({
    groupStatus: calibrationGroupStatus.new,
  });
  useEffect(() => {}, []);
  const updateSearchValue = (_values) => {
    setSearchValue(_values);
  };
  return (
    <CalibrationWorkContext.Provider
      value={{
        updateSearchValue,
        searchValue,
      }}
    >
      {children}
    </CalibrationWorkContext.Provider>
  );
};

export default function useCalibrationWorkContext() {
  const context = useContext(CalibrationWorkContext);
  return context;
}

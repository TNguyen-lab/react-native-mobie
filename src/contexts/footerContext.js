import React, { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constant";
import * as _unitOfWork from "../api";
import { useNavigate } from "react-router-dom";
const FooterContext = createContext({});

export const FooterProvider = ({ children }) => {
  const [footerActive, setFooterActive] = useState("1");
  return (
    <FooterContext.Provider
      value={{
        footerActive,
        setFooterActive,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
};

export default function useFooter() {
  const context = useContext(FooterContext);
  return context;
}

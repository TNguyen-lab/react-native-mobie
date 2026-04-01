import React from 'react';

export const dropdownRender = (menu) => (
  <div style={{ maxHeight: "130px", overflowY: "auto" }}>
    {menu}
  </div>
);
export const filterOption = (input, option) => {
  // Check if option and its label are defined
  if (!option || !option.label) {
    return false; // If not, don't show this option
  }
  return option.label.toLowerCase().includes(input.toLowerCase());
};




export const parsePriceVnd = function (price) {
  if (!price) return 0;
  const numb = parseFloat(price);
  return numb.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
export const priceFormatter = (value) => {
  if (!value) return null;
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const parser = (value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseCurrency = (value) => {
  return value?.replace(/\$\s?|(,*)/g, '') || '';
};
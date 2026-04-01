// utils/cleanObject.js
export function cleanEmptyValues(obj) {
  const cleaned = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    // Loại bỏ "", null, undefined
    if (val !== "" && val !== null && val !== undefined) {
      cleaned[key] = val;
    }
  });
  return cleaned;
}

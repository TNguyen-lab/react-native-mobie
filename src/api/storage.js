import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constant';

// In-memory cache for synchronous access in API functions
let _token = null;
let _companySetting = null;
let _branchChange = null;
let _branchs = null;

/**
 * Initialise in-memory cache from persisted AsyncStorage values.
 * Call once at app startup (inside AuthProvider's useEffect).
 */
export const initStorage = async () => {
  try {
    const results = await AsyncStorage.multiGet([
      STORAGE_KEY.TOKEN,
      STORAGE_KEY.COMPANY_SETTING,
      STORAGE_KEY.BRANCH_CHANGE,
      STORAGE_KEY.BRANCHS,
    ]);
    _token = results[0][1];
    _companySetting = results[1][1] ? JSON.parse(results[1][1]) : null;
    _branchChange = results[2][1];
    _branchs = results[3][1];
  } catch (_) {}
};

// ---------- Token ----------
export const getToken = () => _token;
export const setToken = (token) => {
  _token = token;
};

// ---------- Company / Branch ----------
export const getCompanySetting = () => _companySetting;
export const setCompanySetting = (cs) => {
  _companySetting = cs;
};
export const getBranchChange = () => _branchChange;
export const setBranchChange = (bc) => {
  _branchChange = bc;
};
export const getBranchs = () => (_branchs ? JSON.parse(_branchs) : null);
export const setBranchs = (bsArray) => {
  _branchs = Array.isArray(bsArray) ? JSON.stringify(bsArray) : bsArray;
};

// ---------- Generic helpers ----------
export const setItem = (key, value) => AsyncStorage.setItem(key, value);
export const getItem = (key) => AsyncStorage.getItem(key);
export const removeItem = (key) => AsyncStorage.removeItem(key);

export const clearAll = async () => {
  await AsyncStorage.clear();
  _token = null;
  _companySetting = null;
  _branchChange = null;
  _branchs = null;
};

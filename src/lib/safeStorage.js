/**
 * Safe storage utility that works reliably across browsers and iOS
 * Falls back to in-memory storage if localStorage is unavailable
 */

const inMemoryStore = {};

export const safeStorage = {
  /**
   * Safely get an item from storage
   * @param {string} key
   * @returns {string | null}
   */
  getItem: (key) => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('localStorage unavailable, using in-memory store', e);
    }
    return inMemoryStore[key] || null;
  },

  /**
   * Safely set an item in storage
   * @param {string} key
   * @param {string} value
   * @returns {boolean} - true if successful
   */
  setItem: (key, value) => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn('localStorage unavailable, using in-memory store', e);
    }
    inMemoryStore[key] = value;
    return true;
  },

  /**
   * Safely remove an item from storage
   * @param {string} key
   * @returns {boolean}
   */
  removeItem: (key) => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      console.warn('localStorage unavailable', e);
    }
    delete inMemoryStore[key];
    return true;
  },

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  isAvailable: () => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      }
    } catch (e) {
      return false;
    }
    return true; // in-memory fallback is always available
  }
};

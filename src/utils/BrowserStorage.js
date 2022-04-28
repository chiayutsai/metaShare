/**
 * Browser storage adaptor
 */
import store from 'store/dist/store.modern'

class BrowserStorage {
  /**
   * Get value by key
   * @param {string} key - identifier
   * @param {*} defaultValue - default value if key is not existed
   * @return value from storage
   */
  get = (key, defaultValue) => {
    try {
      const value = store.get(key)
      if (value === undefined) return defaultValue
      return value
    } catch (_) {
      return defaultValue
    }
  }

  /**
   * Set value by key
   * @param {string} key - identifier
   * @param {string|object|integer|boolean} value - value to be storaged
   * @return value to storage
   */
  set = (key, value) => {
    store.set(key, value)
    return value
  }

  /**
   * Delete value from storage
   * @param {string} key - identifier
   */
  remove = key => {
    store.remove(key)
  }
}

export default new BrowserStorage()

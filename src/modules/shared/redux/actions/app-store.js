export const GET_APP_STORE_START = 'GET_APP_STORE_START'
export const GET_APP_STORE_SUCCESS = 'GET_APP_STORE_SUCCESS'
export const GET_APP_STORE_FAILED = 'GET_APP_STORE_FAILED'

/**
 * Get app store
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getAppStore(payload, onSuccess, onError) {
  return {
    type: GET_APP_STORE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get app store success action
 * @param {*} payload
 * @returns {object}
 */
export function getAppStoreSuccess(payload) {
  return {
    type: GET_APP_STORE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getAppStoreFailed() {
  return {
    type: GET_APP_STORE_FAILED,
  }
}

export default {
  getAppStore,
  getAppStoreSuccess,
  getAppStoreFailed,
}

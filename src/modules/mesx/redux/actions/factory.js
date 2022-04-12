export const SEARCH_FACTORIES_START = 'SEARCH_FACTORIES_START'
export const SEARCH_FACTORIES_SUCCESS = 'SEARCH_FACTORIES_SUCCESS'
export const SEARCH_FACTORIES_FAILED = 'SEARCH_FACTORIES_FAILED'

export const CREATE_FACTORY_START = 'CREATE_FACTORY_START'
export const CREATE_FACTORY_SUCCESS = 'CREATE_FACTORY_SUCCESS'
export const CREATE_FACTORY_FAILED = 'CREATE_FACTORY_FAILED'

export const UPDATE_FACTORY_START = 'UPDATE_FACTORY_START'
export const UPDATE_FACTORY_SUCCESS = 'UPDATE_FACTORY_SUCCESS'
export const UPDATE_FACTORY_FAILED = 'UPDATE_FACTORY_FAILED'

export const DELETE_FACTORY_START = 'DELETE_FACTORY_START'
export const DELETE_FACTORY_SUCCESS = 'DELETE_FACTORY_SUCCESS'
export const DELETE_FACTORY_FAILED = 'DELETE_FACTORY_FAILED'

export const GET_FACTORY_DETAILS_START = 'GET_FACTORY_DETAILS_START'
export const GET_FACTORY_DETAILS_SUCCESS = 'GET_FACTORY_DETAILS_SUCCESS'
export const GET_FACTORY_DETAILS_FAILED = 'GET_FACTORY_DETAILS_FAILED'

export const GET_FACTORIES_START = 'GET_FACTORIES_START'
export const GET_FACTORIES_SUCCESS = 'GET_FACTORIES_SUCCESS'
export const GET_FACTORIES_FAILED = 'GET_FACTORIES_FAILED'

export const RESET_FACTORY_DETAILS_STATE = 'RESET_FACTORY_DETAILS_STATE'
/**
 * Search warehouse
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchFactories(payload, onSuccess, onError) {
  return {
    type: SEARCH_FACTORIES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function searchFactoriesSuccess(payload) {
  return {
    type: SEARCH_FACTORIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchFactoriesFailed() {
  return {
    type: SEARCH_FACTORIES_FAILED,
  }
}

/**
 * Create warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createFactory(payload, onSuccess, onError) {
  return {
    type: CREATE_FACTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function createFactorySuccess(payload) {
  return {
    type: CREATE_FACTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse failed action
 * @returns {object}
 */
export function createFactoryFailed() {
  return {
    type: CREATE_FACTORY_FAILED,
  }
}

/**
 * Update warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateFactory(payload, onSuccess, onError) {
  return {
    type: UPDATE_FACTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function updateFactorySuccess(payload) {
  return {
    type: UPDATE_FACTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateFactoryFailed() {
  return {
    type: UPDATE_FACTORY_FAILED,
  }
}
/**
 * Delete warehouse
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteFactory(warehouseId, onSuccess, onError) {
  return {
    type: DELETE_FACTORY_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteFactorySuccess(payload) {
  return {
    type: DELETE_FACTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse failed action
 * @returns {object}
 */
export function deleteFactoryFailed() {
  return {
    type: DELETE_FACTORY_FAILED,
  }
}

/**
 * Get warehouse details
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getFactoryDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: GET_FACTORY_DETAILS_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getFactoryDetailsByIdSuccess(payload) {
  return {
    type: GET_FACTORY_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getFactoryDetailsByIdFailed() {
  return {
    type: GET_FACTORY_DETAILS_FAILED,
  }
}

export function getFactories(payload, onSuccess, onError) {
  return {
    type: GET_FACTORIES_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

/**
 * Get factories success
 * @param {*} payload
 * @returns {object}
 */
export function getFactoriesSuccess(payload) {
  return {
    type: GET_FACTORIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get factories failed
 * @returns {object}
 */
export function getFactoriesFailed() {
  return {
    type: GET_FACTORIES_FAILED,
  }
}

export function resetFactoryDetailsState() {
  return {
    type: RESET_FACTORY_DETAILS_STATE,
  }
}

export default {
  searchFactories,
  searchFactoriesSuccess,
  searchFactoriesFailed,
  createFactory,
  createFactorySuccess,
  createFactoryFailed,
  updateFactory,
  updateFactorySuccess,
  updateFactoryFailed,
  deleteFactory,
  deleteFactorySuccess,
  deleteFactoryFailed,
  getFactoryDetailsById,
  getFactoryDetailsByIdSuccess,
  getFactoryDetailsByIdFailed,
  getFactories,
  getFactoriesSuccess,
  getFactoriesFailed,
  resetFactoryDetailsState,
}

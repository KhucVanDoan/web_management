export const WMSX_SEARCH_SERVICES_START = 'WMSX_SEARCH_SERVICES_START'
export const WMSX_SEARCH_SERVICES_SUCCESS = 'WMSX_SEARCH_SERVICES_SUCCESS'
export const WMSX_SEARCH_SERVICES_FAILED = 'WMSX_SEARCH_SERVICES_FAILED'

export const WMSX_GET_SERVICE_DETAIL_START = 'WMSX_GET_SERVICE_DETAIL_START'
export const WMSX_GET_SERVICE_DETAIL_SUCCESS = 'WMSX_GET_SERVICE_DETAIL_SUCCESS'
export const WMSX_GET_SERVICE_DETAIL_FAILED = 'WMSX_GET_SERVICE_DETAIL_FAILED'

export const WMSX_CREATE_SERVICE_START = 'WMSX_CREATE_SERVICE_START'
export const WMSX_CREATE_SERVICE_SUCCESS = 'WMSX_CREATE_SERVICE_SUCCESS'
export const WMSX_CREATE_SERVICE_FAILED = 'WMSX_CREATE_SERVICE_FAILED'

export const WMSX_UPDATE_SERVICE_START = 'WMSX_UPDATE_SERVICE_START'
export const WMSX_UPDATE_SERVICE_SUCCESS = 'WMSX_UPDATE_SERVICE_SUCCESS'
export const WMSX_UPDATE_SERVICE_FAILED = 'WMSX_UPDATE_SERVICE_FAILED'

export const WMSX_DELETE_SERVICE_START = 'WMSX_DELETE_SERVICE_START'
export const WMSX_DELETE_SERVICE_SUCCESS = 'WMSX_DELETE_SERVICE_SUCCESS'
export const WMSX_DELETE_SERVICE_FAILED = 'WMSX_DELETE_SERVICE_FAILED'

export const WMSX_CONFIRM_SERVICE_SUCCESS = 'WMSX_CONFIRM_SERVICE_SUCCESS'
export const WMSX_CONFIRM_SERVICE_START = 'WMSX_CONFIRM_SERVICE_START'
export const WMSX_CONFIRM_SERVICE_FAILED = 'WMSX_CONFIRM_SERVICE_FAILED'

export const WMSX_REJECT_SERVICE_SUCCESS = 'WMSX_REJECT_SERVICE_SUCCESS'
export const WMSX_REJECT_SERVICE_START = 'WMSX_REJECT_SERVICE_START'
export const WMSX_REJECT_SERVICE_FAILED = 'WMSX_REJECT_SERVICE_FAILED'

export const WMSX_GET_ALL_SERVICES_DETAIL_START =
  'WMSX_GET_ALL_SERVICES_DETAIL_START'
export const WMSX_GET_ALL_SERVICES_DETAIL_SUCCESS =
  'WMSX_GET_ALL_SERVICES_DETAIL_SUCCESS'
export const WMSX_GET_ALL_SERVICES_DETAIL_FAILED =
  'WMSX_GET_ALL_SERVICES_DETAIL_FAILED'

export const WMSX_RESET_SERVICE_DETAIL_STATE = 'WMSX_RESET_SERVICE_DETAIL_STATE'

/**
 * Search service
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchServices(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_SERVICES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchServicesSuccess(payload) {
  return {
    type: WMSX_SEARCH_SERVICES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search service failed action
 * @returns {object}
 */
export function searchServicesFailed() {
  return {
    type: WMSX_SEARCH_SERVICES_FAILED,
  }
}

/**
 * Get service details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getServiceDetailById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_SERVICE_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get service details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getServiceDetailByIdSuccess(payload) {
  return {
    type: WMSX_GET_SERVICE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get service details by id failed action
 * @returns {object}
 */
export function getServiceDetailByIdFailed() {
  return {
    type: WMSX_GET_SERVICE_DETAIL_FAILED,
  }
}

/**
 * Create service
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createService(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_SERVICE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create service success action
 * @param {*} payload
 * @returns {object}
 */
export function createServiceSuccess(payload) {
  return {
    type: WMSX_CREATE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create service failed action
 * @returns {object}
 */
export function createServiceFailed() {
  return {
    type: WMSX_CREATE_SERVICE_FAILED,
  }
}

/**
 * Update service
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateService(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_SERVICE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update service success action
 * @param {*} payload
 * @returns {object}
 */
export function updateServiceSuccess(payload) {
  return {
    type: WMSX_UPDATE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update service failed action
 * @returns {object}
 */
export function updateServiceFailed() {
  return {
    type: WMSX_UPDATE_SERVICE_FAILED,
  }
}

/**
 * Delete service
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteService(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_SERVICE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete service success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteServiceSuccess(payload) {
  return {
    type: WMSX_DELETE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete service failed action
 * @returns {object}
 */
export function deleteServiceFailed() {
  return {
    type: WMSX_DELETE_SERVICE_FAILED,
  }
}

export function confirmServiceById(serviceId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_SERVICE_START,
    payload: serviceId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm service by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmServiceByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm service by id failed action
 * @returns {object}
 */
export function confirmServiceByIdFailed() {
  return {
    type: WMSX_CONFIRM_SERVICE_FAILED,
  }
}

export function rejectServiceById(serviceId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_SERVICE_START,
    payload: serviceId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject service by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectServiceByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject service by id failed action
 * @returns {object}
 */
export function rejectServiceByIdFailed() {
  return {
    type: WMSX_REJECT_SERVICE_FAILED,
  }
}

/**
 * Get all service details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getAllServicesDetail(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_ALL_SERVICES_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get all service detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getAllServicesDetailSuccess(payload) {
  return {
    type: WMSX_GET_ALL_SERVICES_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get all service detail failed action
 * @returns {object}
 */
export function getAllServicesDetailFailed() {
  return {
    type: WMSX_GET_ALL_SERVICES_DETAIL_FAILED,
  }
}

export function resetServiceDetailState() {
  return {
    type: WMSX_RESET_SERVICE_DETAIL_STATE,
  }
}

export default {
  searchServices,
  searchServicesFailed,
  searchServicesSuccess,
  getAllServicesDetail,
  getAllServicesDetailFailed,
  getAllServicesDetailSuccess,
  getServiceDetailById,
  getServiceDetailByIdFailed,
  getServiceDetailByIdSuccess,
  resetServiceDetailState,
  confirmServiceById,
  confirmServiceByIdFailed,
  confirmServiceByIdSuccess,
  rejectServiceById,
  rejectServiceByIdFailed,
  rejectServiceByIdSuccess,
  createService,
  createServiceFailed,
  createServiceSuccess,
  updateService,
  updateServiceFailed,
  updateServiceSuccess,
  deleteService,
  deleteServiceFailed,
  deleteServiceSuccess,
}

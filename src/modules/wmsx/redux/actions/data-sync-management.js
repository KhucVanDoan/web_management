export const WMSX_SEARCH_DATA_SYNC_MANAGEMENT_START =
  'WMSX_SEARCH_DATA_SYNC_MANAGEMENT_START'
export const WMSX_SEARCH_DATA_SYNC_MANAGEMENT_SUCCESS =
  'WMSX_SEARCH_DATA_SYNC_MANAGEMENT_SUCCESS'
export const WMSX_SEARCH_DATA_SYNC_MANAGEMENT_FAILED =
  'WMSX_SEARCH_DATA_SYNC_MANAGEMENT_FAILED'

export const WMSX_DATA_SYNC_MANAGEMENT_DETAIL_START =
  'WMSX_DATA_SYNC_MANAGEMENT_DETAIL_START'
export const WMSX_DATA_SYNC_MANAGEMENT_DETAIL_SUCCESS =
  'WMSX_DATA_SYNC_MANAGEMENT_DETAIL_SUCCESS'
export const WMSX_DATA_SYNC_MANAGEMENT_DETAIL_FAILED =
  'WMSX_DATA_SYNC_MANAGEMENT_DETAIL_FAILED'

export const WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START =
  'WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START'
export const WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS =
  'WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS'
export const WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED =
  'WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED'

export const WMSX_RETRY_DATA_SYNC_MANAGEMENT_START =
  'WMSX_RETRY_DATA_SYNC_MANAGEMENT_START'
export const WMSX_RETRY_DATA_SYNC_MANAGEMENT_SUCCESS =
  'WMSX_RETRY_DATA_SYNC_MANAGEMENT_SUCCESS'
export const WMSX_RETRY_DATA_SYNC_MANAGEMENT_FAILED =
  'WMSX_RETRY_DATA_SYNC_MANAGEMENT_FAILED'

export const WMSX_REJECT_DATA_SYNC_MANAGEMENT_START =
  'WMSX_REJECT_DATA_SYNC_MANAGEMENT_START'
export const WMSX_REJECT_DATA_SYNC_MANAGEMENT_SUCCESS =
  'WMSX_REJECT_DATA_SYNC_MANAGEMENT_SUCCESS'
export const WMSX_REJECT_DATA_SYNC_MANAGEMENT_FAILED =
  'WMSX_REJECT_DATA_SYNC_MANAGEMENT_FAILED'

export const RESET_DATA_SYNC_MANAGEMENT_DETAILS_STATE =
  'RESET_DATA_SYNC_MANAGEMENT_DETAILS_STATE'

/**
 * Get inventory details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchDataSyncManagement(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_DATA_SYNC_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchDataSyncManagementSuccess(payload) {
  return {
    type: WMSX_SEARCH_DATA_SYNC_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function searchDataSyncManagementFailed() {
  return {
    type: WMSX_SEARCH_DATA_SYNC_MANAGEMENT_FAILED,
  }
}

export function getDataSyncManagementDetail(payload, onSuccess, onError) {
  return {
    type: WMSX_DATA_SYNC_MANAGEMENT_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getDataSyncManagementDetailSuccess(payload) {
  return {
    type: WMSX_DATA_SYNC_MANAGEMENT_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function getDataSyncManagementDetailFailed() {
  return {
    type: WMSX_DATA_SYNC_MANAGEMENT_DETAIL_FAILED,
  }
}

export function approveDataSyncManagement(payload, onSuccess, onError) {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function approveDataSyncManagementSuccess(payload) {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function approveDataSyncManagementFailed() {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED,
  }
}

export function rejectDataSyncManagement(payload, onSuccess, onError) {
  return {
    type: WMSX_REJECT_DATA_SYNC_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectDataSyncManagementSuccess(payload) {
  return {
    type: WMSX_REJECT_DATA_SYNC_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function rejectDataSyncManagementFailed() {
  return {
    type: WMSX_REJECT_DATA_SYNC_MANAGEMENT_FAILED,
  }
}

export function retryDataSyncManagement(payload, onSuccess, onError) {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function retryDataSyncManagementSuccess(payload) {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function retryDataSyncManagementFailed() {
  return {
    type: WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED,
  }
}

export function resetDataSyncManagementDetailsState() {
  return {
    type: RESET_DATA_SYNC_MANAGEMENT_DETAILS_STATE,
  }
}

export default {
  searchDataSyncManagement,
  searchDataSyncManagementSuccess,
  searchDataSyncManagementFailed,
  getDataSyncManagementDetail,
  getDataSyncManagementDetailFailed,
  getDataSyncManagementDetailSuccess,
  resetDataSyncManagementDetailsState,
  approveDataSyncManagement,
  approveDataSyncManagementSuccess,
  approveDataSyncManagementFailed,
  rejectDataSyncManagement,
  rejectDataSyncManagementFailed,
  rejectDataSyncManagementSuccess,
  retryDataSyncManagement,
  retryDataSyncManagementFailed,
  retryDataSyncManagementSuccess,
}

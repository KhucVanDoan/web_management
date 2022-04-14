export const SEARCH_QUALITY_POINT_START = 'QMSX_SEARCH_QUALITY_POINT_START'
export const SEARCH_QUALITY_POINT_SUCCESS = 'QMSX_SEARCH_QUALITY_POINT_SUCCESS'
export const SEARCH_QUALITY_POINT_FAIL = 'QMSX_SEARCH_QUALITY_POINT_FAIL'

export const CREATE_QUALITY_POINT_START = 'QMSX_CREATE_QUALITY_POINT_START'
export const CREATE_QUALITY_POINT_SUCCESS = 'QMSX_CREATE_QUALITY_POINT_SUCCESS'
export const CREATE_QUALITY_POINT_FAIL = 'QMSX_CREATE_QUALITY_POINT_FAIL'

export const UPDATE_QUALITY_POINT_START = 'QMSX_UPDATE_QUALITY_POINT_START'
export const UPDATE_QUALITY_POINT_SUCCESS = 'QMSX_UPDATE_QUALITY_POINT_SUCCESS'
export const UPDATE_QUALITY_POINT_FAIL = 'QMSX_UPDATE_QUALITY_POINT_FAIL'

export const DELETE_QUALITY_POINT_START = 'QMSX_DELETE_QUALITY_POINT_START'
export const DELETE_QUALITY_POINT_SUCCESS = 'QMSX_DELETE_QUALITY_POINT_SUCCESS'
export const DELETE_QUALITY_POINT_FAIL = 'QMSX_DELETE_QUALITY_POINT_FAIL'

export const GET_QUALITY_POINT_DETAIL_START =
  'QMSX_GET_QUALITY_POINT_DETAIL_START'
export const GET_QUALITY_POINT_DETAIL_SUCCESS =
  'QMSX_GET_QUALITY_POINT_DETAIL_SUCCESS'
export const GET_QUALITY_POINT_DETAIL_FAIL =
  'QMSX_GET_QUALITY_POINT_DETAIL_FAIL'

export const CONFIRM_QUALITY_POINT_START = 'QMSX_CONFIRM_QUALITY_POINT_START'
export const CONFIRM_QUALITY_POINT_SUCCESS =
  'QMSX_CONFIRM_QUALITY_POINT_SUCCESS'
export const CONFIRM_QUALITY_POINT_FAIL = 'QMSX_CONFIRM_QUALITY_POINT_FAIL'

export const RESET_QUALITY_POINT_DETAIL_STATE =
  'QMSX_RESET_QUALITY_POINT_DETAIL_STATE'

/**
 * Search quality-point start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchQualityPoint(payload, onSuccess, onError) {
  return {
    type: SEARCH_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search quality-point success action
 * @param {*} payload
 * @returns {object}
 */
export function searchQualityPointSuccess(payload) {
  return {
    type: SEARCH_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search quality-point fail action
 * @returns {object}
 */
export function searchQualityPointFail() {
  return {
    type: SEARCH_QUALITY_POINT_FAIL,
  }
}

/**
 * Create quality-point start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createQualityPoint(payload, onSuccess, onError) {
  return {
    type: CREATE_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create quality-point success action
 * @param {*} payload
 * @returns {object}
 */
export function createQualityPointSuccess(payload) {
  return {
    type: CREATE_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create quality-point fail action
 * @returns {object}
 */
export function createQualityPointFail() {
  return {
    type: CREATE_QUALITY_POINT_FAIL,
  }
}

/**
 * Update quality-point start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateQualityPoint(payload, onSuccess, onError) {
  return {
    type: UPDATE_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update quality-point success action
 * @param {*} payload
 * @returns {object}
 */
export function updateQualityPointSuccess(payload) {
  return {
    type: UPDATE_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update quality-point fail action
 * @returns {object}
 */
export function updateQualityPointFail() {
  return {
    type: UPDATE_QUALITY_POINT_FAIL,
  }
}
/**
 * Delete quality-point start action
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteQualityPoint(payload, onSuccess, onError) {
  return {
    type: DELETE_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete quality-point success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteQualityPointSuccess(payload) {
  return {
    type: DELETE_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete quality-point fail action
 * @returns {object}
 */
export function deleteQualityPointFail() {
  return {
    type: DELETE_QUALITY_POINT_FAIL,
  }
}

/**
 * Get quality-point detail start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getQualityPointDetailById(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_POINT_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get quality-point detail start action
 * @param {*} payload
 * @returns {object}
 */
export function getQualityPointDetailByIdSuccess(payload) {
  return {
    type: GET_QUALITY_POINT_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get quality-point detail fail action
 * @returns {object}
 */
export function getQualityPointDetailByIdFail() {
  return {
    type: GET_QUALITY_POINT_DETAIL_FAIL,
  }
}

/**
 * Confirm quality-point start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmQualityPoint(payload, onSuccess, onError) {
  return {
    type: CONFIRM_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Confirm quality-point success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmQualityPointSuccess(payload) {
  return {
    type: CONFIRM_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Confirm quality-point fail action
 * @returns {object}
 */
export function confirmQualityPointFail() {
  return {
    type: CONFIRM_QUALITY_POINT_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetQualityPointDetailState() {
  return {
    type: RESET_QUALITY_POINT_DETAIL_STATE,
  }
}

export default {
  searchQualityPoint,
  searchQualityPointSuccess,
  searchQualityPointFail,
  createQualityPoint,
  createQualityPointSuccess,
  createQualityPointFail,
  getQualityPointDetailById,
  getQualityPointDetailByIdSuccess,
  getQualityPointDetailByIdFail,
  updateQualityPoint,
  updateQualityPointSuccess,
  updateQualityPointFail,
  deleteQualityPoint,
  deleteQualityPointSuccess,
  deleteQualityPointFail,
  confirmQualityPoint,
  confirmQualityPointSuccess,
  confirmQualityPointFail,
  resetQualityPointDetailState,
}

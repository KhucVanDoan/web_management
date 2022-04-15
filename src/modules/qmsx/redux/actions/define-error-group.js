// Action: Get list error-group
export const SEARCH_ERROR_GROUP_START = 'QMSX_SEARCH_ERROR_GROUP_START'
export const SEARCH_ERROR_GROUP_SUCCESS = 'QMSX_SEARCH_ERROR_GROUP_SUCCESS'
export const SEARCH_ERROR_GROUP_FAIL = 'QMSX_SEARCH_ERROR_GROUP_FAIL'

// Action: Create error-group
export const CREATE_ERROR_GROUP_START = 'QMSX_CREATE_ERROR_GROUP_START'
export const CREATE_ERROR_GROUP_SUCCESS = 'QMSX_CREATE_ERROR_GROUP_SUCCESS'
export const CREATE_ERROR_GROUP_FAIL = 'QMSX_CREATE_ERROR_GROUP_FAIL'

// Action: Update error-group
export const UPDATE_ERROR_GROUP_START = 'QMSX_UPDATE_ERROR_GROUP_START'
export const UPDATE_ERROR_GROUP_SUCCESS = 'QMSX_UPDATE_ERROR_GROUP_SUCCESS'
export const UPDATE_ERROR_GROUP_FAIL = 'QMSX_UPDATE_ERROR_GROUP_FAIL'

// Action: Delete error-group
export const DELETE_ERROR_GROUP_START = 'QMSX_DELETE_ERROR_GROUP_START'
export const DELETE_ERROR_GROUP_SUCCESS = 'QMSX_DELETE_ERROR_GROUP_SUCCESS'
export const DELETE_ERROR_GROUP_FAIL = 'QMSX_DELETE_ERROR_GROUP_FAIL'

// Action: Get detail error-group
export const GET_ERROR_GROUP_DETAIL_START = 'QMSX_GET_ERROR_GROUP_DETAIL_START'
export const GET_ERROR_GROUP_DETAIL_SUCCESS =
  'QMSX_GET_ERROR_GROUP_DETAIL_SUCCESS'
export const GET_ERROR_GROUP_DETAIL_FAIL = 'QMSX_GET_ERROR_GROUP_DETAIL_FAIL'

// Action: upload file
export const UPLOAD_ERROR_GROUP_DATA_START =
  'QMSX_UPLOAD_ERROR_GROUP_DATA_START'
export const UPLOAD_ERROR_GROUP_DATA_SUCCESS =
  'QMSX_UPLOAD_ERROR_GROUP_DATA_SUCCESS'
export const UPLOAD_ERROR_GROUP_DATA_FAIL = 'QMSX_UPLOAD_ERROR_GROUP_DATA_FAIL'

// Action: download log file
export const DOWNLOAD_ERROR_GROUP_DATA_LOG_START =
  'QMSX_DOWNLOAD_ERROR_GROUP_DATA_LOG_START'
export const DOWNLOAD_ERROR_GROUP_DATA_LOG_SUCCESS =
  'QMSX_DOWNLOAD_ERROR_GROUP_DATA_LOG_SUCCESS'
export const DOWNLOAD_ERROR_GROUP_DATA_LOG_FAIL =
  'QMSX_DOWNLOAD_ERROR_GROUP_DATA_LOG_FAIL'

// Action: download template
export const DOWNLOAD_ERROR_GROUP_TEMPLATE_START =
  'QMSX_DOWNLOAD_ERROR_GROUP_TEMPLATE_START'
export const DOWNLOAD_ERROR_GROUP_TEMPLATE_SUCCESS =
  'QMSX_DOWNLOAD_ERROR_GROUP_TEMPLATE_SUCCESS'
export const DOWNLOAD_ERROR_GROUP_TEMPLATE_FAIL =
  'QMSX_DOWNLOAD_ERROR_GROUP_TEMPLATE_FAIL'

//Action: reset state
export const RESET_ERROR_GROUP_DETAIL_STATE =
  'QMSX_RESET_ERROR_GROUP_DETAIL_STATE'
/**
 * Search error group start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchErrorGroup(payload, onSuccess, onError) {
  return {
    type: SEARCH_ERROR_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search error group success action
 * @param {*} payload
 * @returns {object}
 */
export function searchErrorGroupSuccess(payload) {
  return {
    type: SEARCH_ERROR_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Search error group fail action
 * @returns {object}
 */
export function searchErrorGroupFail() {
  return {
    type: SEARCH_ERROR_GROUP_FAIL,
  }
}

/**
 * Create error group start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createErrorGroup(payload, onSuccess, onError) {
  return {
    type: CREATE_ERROR_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create error group success action
 * @param {*} payload
 * @returns {object}
 */
export function createErrorGroupSuccess(payload) {
  return {
    type: CREATE_ERROR_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Create error group fail action
 * @returns {object}
 */
export function createErrorGroupFail() {
  return {
    type: CREATE_ERROR_GROUP_FAIL,
  }
}

/**
 * Update error group
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateErrorGroup(payload, onSuccess, onError) {
  return {
    type: UPDATE_ERROR_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update error group success action
 * @param {*} payload
 * @returns {object}
 */
export function updateErrorGroupSuccess(payload) {
  return {
    type: UPDATE_ERROR_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Update error group fail action
 * @returns {object}
 */
export function updateErrorGroupFail() {
  return {
    type: UPDATE_ERROR_GROUP_FAIL,
  }
}
/**
 * Delete error group
 * @param {int} errorGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteErrorGroup(errorGroupId, onSuccess, onError) {
  return {
    type: DELETE_ERROR_GROUP_START,
    payload: errorGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete error group success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteErrorGroupSuccess(payload) {
  return {
    type: DELETE_ERROR_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete error group fail action
 * @returns {object}
 */
export function deleteErrorGroupFail() {
  return {
    type: DELETE_ERROR_GROUP_FAIL,
  }
}

/**
 * Get error group detail start action
 * @param {int} errorGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getErrorGroupDetailById(errorGroupId, onSuccess, onError) {
  return {
    type: GET_ERROR_GROUP_DETAIL_START,
    payload: errorGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get error group detail by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getErrorGroupDetailByIdSuccess(payload) {
  return {
    type: GET_ERROR_GROUP_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get error group detail by id fail action
 * @returns {object}
 */
export function getErrorGroupDetailByIdFail() {
  return {
    type: GET_ERROR_GROUP_DETAIL_FAIL,
  }
}

//---------------------- IMPORT ----------------------
/**
 * Upload file start action
 * @param {*} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export const uploadErrorGroupData = (payload, onSuccess, onError) => ({
  type: UPLOAD_ERROR_GROUP_DATA_START,
  payload: payload,
  onSuccess: onSuccess,
  onError: onError,
})

/**
 * Upload file success action
 * @param {*} payload
 * @returns {object}
 */
export const uploadErrorGroupDataSuccess = (payload) => ({
  type: UPLOAD_ERROR_GROUP_DATA_SUCCESS,
  payload: payload,
})

/**
 * Upload file fail action
 * @returns {object}
 */
export const uploadErrorGroupDataFail = () => ({
  type: UPLOAD_ERROR_GROUP_DATA_FAIL,
})

/**
 * Download log file start action
 * @param {*} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export const downloadErrorGroupDataLog = (payload, onSuccess, onError) => ({
  type: DOWNLOAD_ERROR_GROUP_DATA_LOG_START,
  payload: payload,
  onSuccess: onSuccess,
  onError: onError,
})

/**
 * Download log file success action
 * @param {*} payload
 * @returns {object}
 */
export const downloadErrorGroupDataLogSuccess = (payload) => ({
  type: DOWNLOAD_ERROR_GROUP_DATA_LOG_SUCCESS,
  payload: payload,
})

/**
 * Download log file fail action
 * @returns {object}
 */
export const downloadErrorGroupDataLogFail = () => ({
  type: DOWNLOAD_ERROR_GROUP_DATA_LOG_FAIL,
})

/**
 * Download template file start action
 * @param {*} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export const downloadErrorGroupTemplate = (payload, onSuccess, onError) => ({
  type: DOWNLOAD_ERROR_GROUP_TEMPLATE_START,
  payload: payload,
  onSuccess: onSuccess,
  onError: onError,
})

/**
 * Download log file success action
 * @param {*} payload
 * @returns {object}
 */
export const downloadErrorGroupTemplateSuccess = () => ({
  type: DOWNLOAD_ERROR_GROUP_TEMPLATE_SUCCESS,
})

/**
 * Download log file fail action
 * @returns {object}
 */
export const downloadErrorGroupTemplateFail = () => ({
  type: DOWNLOAD_ERROR_GROUP_TEMPLATE_FAIL,
})

/**
 * Reset state action
 * @returns {object}
 */
export function resetErrorGroupDetailState() {
  return {
    type: RESET_ERROR_GROUP_DETAIL_STATE,
  }
}

export default {
  searchErrorGroup,
  searchErrorGroupSuccess,
  searchErrorGroupFail,
  createErrorGroup,
  createErrorGroupSuccess,
  createErrorGroupFail,
  getErrorGroupDetailById,
  getErrorGroupDetailByIdSuccess,
  getErrorGroupDetailByIdFail,
  updateErrorGroup,
  updateErrorGroupSuccess,
  updateErrorGroupFail,
  deleteErrorGroup,
  deleteErrorGroupSuccess,
  deleteErrorGroupFail,
  resetErrorGroupDetailState,
  //import
}
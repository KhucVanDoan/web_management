export const SEARCH_INVENTORY_CALENDARS_START =
  'WMSX_SEARCH_INVENTORY_CALENDARS_START'
export const SEARCH_INVENTORY_CALENDARS_SUCCESS =
  'WMSX_SEARCH_INVENTORY_CALENDARS_SUCCESS'
export const SEARCH_INVENTORY_CALENDARS_FAILED =
  'WMSX_SEARCH_INVENTORY_CALENDARS_FAILED'

export const CREATE_INVENTORY_CALENDAR_START =
  'WMSX_CREATE_INVENTORY_CALENDAR_START'
export const CREATE_INVENTORY_CALENDAR_SUCCESS =
  'WMSX_CREATE_INVENTORY_CALENDAR_SUCCESS'
export const CREATE_INVENTORY_CALENDAR_FAILED =
  'WMSX_CREATE_INVENTORY_CALENDAR_FAILED'

export const UPDATE_INVENTORY_CALENDAR_START =
  'WMSX_UPDATE_INVENTORY_CALENDAR_START'
export const UPDATE_INVENTORY_CALENDAR_SUCCESS =
  'WMSX_UPDATE_INVENTORY_CALENDAR_SUCCESS'
export const UPDATE_INVENTORY_CALENDAR_FAILED =
  'WMSX_UPDATE_INVENTORY_CALENDAR_FAILED'

export const DELETE_INVENTORY_CALENDAR_START =
  'WMSX_DELETE_INVENTORY_CALENDAR_START'
export const DELETE_INVENTORY_CALENDAR_SUCCESS =
  'WMSX_DELETE_INVENTORY_CALENDAR_SUCCESS'
export const DELETE_INVENTORY_CALENDAR_FAILED =
  'WMSX_DELETE_INVENTORY_CALENDAR_FAILED'

export const GET_INVENTORY_CALENDAR_DETAILS_START =
  'WMSX_GET_INVENTORY_CALENDAR_DETAILS_START'
export const GET_INVENTORY_CALENDAR_DETAILS_SUCCESS =
  'WMSX_GET_INVENTORY_CALENDAR_DETAILS_SUCCESS'
export const GET_INVENTORY_CALENDAR_DETAILS_FAILED =
  'WMSX_GET_INVENTORY_CALENDAR_DETAILS_FAILED'

export const CONFIRM_INVENTORY_CALENDAR_START =
  'WMSX_CONFIRM_INVENTORY_CALENDAR_START'
export const CONFIRM_INVENTORY_CALENDAR_SUCCESS =
  'WMSX_CONFIRM_INVENTORY_CALENDAR_SUCCESS'
export const CONFIRM_INVENTORY_CALENDAR_FAILED =
  'WMSX_CONFIRM_INVENTORY_CALENDAR_FAILED'

export const REJECT_INVENTORY_CALENDAR_START =
  'WMSX_REJECT_INVENTORY_CALENDAR_START'
export const REJECT_INVENTORY_CALENDAR_SUCCESS =
  'WMSX_REJECT_INVENTORY_CALENDAR_SUCCESS'
export const REJECT_INVENTORY_CALENDAR_FAILED =
  'WMSX_REJECT_INVENTORY_CALENDAR_FAILED'

export const RESET_INVENTORY_CALENDAR_DETAILS_STATE =
  'WMSX_RESET_INVENTORY_CALENDAR_DETAILS_STATE'

/**
 * Search inventoryCalendar
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryCalendars(payload, onSuccess, onError) {
  return {
    type: SEARCH_INVENTORY_CALENDARS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search inventoryCalendar success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInventoryCalendarsSuccess(payload) {
  return {
    type: SEARCH_INVENTORY_CALENDARS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search inventoryCalendar failed action
 * @returns {object}
 */
export function searchInventoryCalendarsFailed() {
  return {
    type: SEARCH_INVENTORY_CALENDARS_FAILED,
  }
}

/**
 * Create inventoryCalendar
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInventoryCalendar(payload, onSuccess, onError) {
  return {
    type: CREATE_INVENTORY_CALENDAR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create inventoryCalendar success action
 * @param {*} payload
 * @returns {object}
 */
export function createInventoryCalendarSuccess(payload) {
  return {
    type: CREATE_INVENTORY_CALENDAR_SUCCESS,
    payload: payload,
  }
}

/**
 * Create inventoryCalendar failed action
 * @returns {object}
 */
export function createInventoryCalendarFailed() {
  return {
    type: CREATE_INVENTORY_CALENDAR_FAILED,
  }
}

/**
 * Update inventoryCalendar
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInventoryCalendar(payload, onSuccess, onError) {
  return {
    type: UPDATE_INVENTORY_CALENDAR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update inventoryCalendar success action
 * @param {*} payload
 * @returns {object}
 */
export function updateInventoryCalendarSuccess(payload) {
  return {
    type: UPDATE_INVENTORY_CALENDAR_SUCCESS,
    payload: payload,
  }
}

/**
 * Update inventoryCalendar failed action
 * @returns {object}
 */
export function updateInventoryCalendarFailed() {
  return {
    type: UPDATE_INVENTORY_CALENDAR_FAILED,
  }
}
/**
 * Delete inventoryCalendar
 * @param {int} inventoryCalendarId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInventoryCalendar(
  inventoryCalendarId,
  onSuccess,
  onError,
) {
  return {
    type: DELETE_INVENTORY_CALENDAR_START,
    payload: inventoryCalendarId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete inventoryCalendar success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteInventoryCalendarSuccess(payload) {
  return {
    type: DELETE_INVENTORY_CALENDAR_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete inventoryCalendar failed action
 * @returns {object}
 */
export function deleteInventoryCalendarFailed() {
  return {
    type: DELETE_INVENTORY_CALENDAR_FAILED,
  }
}

/**
 * Get inventoryCalendar details
 * @param {int} inventoryCalendarId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInventoryCalendarDetailsById(
  inventoryCalendarId,
  onSuccess,
  onError,
) {
  return {
    type: GET_INVENTORY_CALENDAR_DETAILS_START,
    payload: inventoryCalendarId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventoryCalendar details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInventoryCalendarDetailsByIdSuccess(payload) {
  return {
    type: GET_INVENTORY_CALENDAR_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventoryCalendar details by id failed action
 * @returns {object}
 */
export function getInventoryCalendarDetailsByIdFailed() {
  return {
    type: GET_INVENTORY_CALENDAR_DETAILS_FAILED,
  }
}

/**
 * Get confirm production order
 * @param {int} inventoryCalendarId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmInventoryCalendarById(
  inventoryCalendarId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_INVENTORY_CALENDAR_START,
    payload: inventoryCalendarId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmInventoryCalendarByIdSuccess(payload) {
  return {
    type: CONFIRM_INVENTORY_CALENDAR_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmInventoryCalendarByIdFailed() {
  return {
    type: CONFIRM_INVENTORY_CALENDAR_FAILED,
  }
}

/**
 * Get reject production order
 * @param {int} inventoryCalendarId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectInventoryCalendarById(
  inventoryCalendarId,
  onSuccess,
  onError,
) {
  return {
    type: REJECT_INVENTORY_CALENDAR_START,
    payload: inventoryCalendarId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectInventoryCalendarByIdSuccess(payload) {
  return {
    type: REJECT_INVENTORY_CALENDAR_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject production order by id failed action
 * @returns {object}
 */
export function rejectInventoryCalendarByIdFailed() {
  return {
    type: REJECT_INVENTORY_CALENDAR_FAILED,
  }
}

export function resetInventoryCalendarDetailsState() {
  return {
    type: RESET_INVENTORY_CALENDAR_DETAILS_STATE,
  }
}

export default {
  searchInventoryCalendars,
  searchInventoryCalendarsSuccess,
  searchInventoryCalendarsFailed,
  createInventoryCalendar,
  createInventoryCalendarSuccess,
  createInventoryCalendarFailed,
  updateInventoryCalendar,
  updateInventoryCalendarSuccess,
  updateInventoryCalendarFailed,
  deleteInventoryCalendar,
  deleteInventoryCalendarSuccess,
  deleteInventoryCalendarFailed,
  getInventoryCalendarDetailsById,
  getInventoryCalendarDetailsByIdSuccess,
  getInventoryCalendarDetailsByIdFailed,
  confirmInventoryCalendarById,
  confirmInventoryCalendarByIdSuccess,
  confirmInventoryCalendarByIdFailed,
  rejectInventoryCalendarById,
  rejectInventoryCalendarByIdSuccess,
  rejectInventoryCalendarByIdFailed,
  resetInventoryCalendarDetailsState,
}

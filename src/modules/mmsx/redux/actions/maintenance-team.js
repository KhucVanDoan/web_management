export const GET_LIST_MAINTENANCE_TEAM_START =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_START'
export const GET_LIST_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS'
export const GET_LIST_MAINTENANCE_TEAM_ERROR =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR'

export const GET_DETAIL_MAINTENANCE_TEAM_START =
  'MMSX_GET_DETAIL_MAINTENANCE_TEAM_START'
export const GET_DETAIL_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_GET_DETAIL_MAINTENANCE_TEAM_SUCCESS'
export const GET_DETAIL_MAINTENANCE_TEAM_ERROR =
  'MMSX_GET_DETAIL_MAINTENANCE_TEAM_ERROR'

export const CREATE_MAINTENANCE_TEAM_START =
  'MMSX_CREATE_MAINTENANCE_TEAM_START'
export const CREATE_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_CREATE_MAINTENANCE_TEAM_SUCCESS'
export const CREATE_MAINTENANCE_TEAM_ERROR =
  'MMSX_CREATE_MAINTENANCE_TEAM_ERROR'

export const UPDATE_MAINTENANCE_TEAM_START =
  'MMSX_UPDATE_MAINTENANCE_TEAM_START'
export const UPDATE_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_UPDATE_MAINTENANCE_TEAM_SUCCESS'
export const UPDATE_MAINTENANCE_TEAM_ERROR =
  'MMSX_UPDATE_MAINTENANCE_TEAM_ERROR'

export const DELETE_MAINTENANCE_TEAM_START =
  'MMSX_DELETE_MAINTENANCE_TEAM_START'
export const DELETE_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_DELETE_MAINTENANCE_TEAM_SUCCESS'
export const DELETE_MAINTENANCE_TEAM_ERROR =
  'MMSX_DELETE_MAINTENANCE_TEAM_ERROR'

export const GET_ALL_USER_IT_DEPARTMENT_START =
  'MMSX_GET_ALL_USER_IT_DEPARTMENT_START'
export const GET_ALL_USER_IT_DEPARTMENT_SUCCESS =
  'MMSX_GET_ALL_USER_IT_DEPARTMENT_SUCCESS'
export const GET_ALL_USER_IT_DEPARTMENT_FAIL =
  'MMSX_GET_ALL_USER_IT_DEPARTMENT_FAIL'

export const RESET_MAINTENANCE_TEAM = 'MMSX_RESET_MAINTENANCE_TEAM'

/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getListMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: GET_LIST_MAINTENANCE_TEAM_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getListMaintenanceTeamSuccess(payload) {
  return {
    type: GET_LIST_MAINTENANCE_TEAM_SUCCESS,
    payload,
  }
}

export function getListMaintenanceTeamError(payload) {
  return {
    type: GET_LIST_MAINTENANCE_TEAM_ERROR,
    payload,
  }
}

export function getDetailMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_MAINTENANCE_TEAM_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailMaintenanceTeamSuccess(payload) {
  return {
    type: GET_DETAIL_MAINTENANCE_TEAM_SUCCESS,
    payload: payload,
  }
}

export function getDetailMaintenanceTeamError() {
  return {
    type: GET_DETAIL_MAINTENANCE_TEAM_ERROR,
  }
}

export function createMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: CREATE_MAINTENANCE_TEAM_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createMaintenanceTeamSuccess(payload) {
  return {
    type: CREATE_MAINTENANCE_TEAM_SUCCESS,
    payload,
  }
}

export function createMaintenanceTeamError(payload) {
  return {
    type: CREATE_MAINTENANCE_TEAM_ERROR,
    payload,
  }
}

export function updateMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: UPDATE_MAINTENANCE_TEAM_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateMaintenanceTeamSuccess(payload) {
  return {
    type: UPDATE_MAINTENANCE_TEAM_SUCCESS,
    payload,
  }
}

export function updateMaintenanceTeamError(payload) {
  return {
    type: UPDATE_MAINTENANCE_TEAM_ERROR,
    payload,
  }
}

export function deleteMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: DELETE_MAINTENANCE_TEAM_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function deleteMaintenanceTeamSuccess(payload) {
  return {
    type: DELETE_MAINTENANCE_TEAM_SUCCESS,
    payload: payload,
  }
}

export function deleteMaintenanceTeamError(payload) {
  return {
    type: DELETE_MAINTENANCE_TEAM_ERROR,
    payload,
  }
}

export function getAllUserItDepartment(payload, onSuccess, onError) {
  return {
    type: GET_ALL_USER_IT_DEPARTMENT_START,
    payload,
    onSuccess,
    onError,
  }
}
export function getAllUserItDepartmentSuccess(payload) {
  return {
    type: GET_ALL_USER_IT_DEPARTMENT_SUCCESS,
    payload,
  }
}
export function getAllUserItDepartmentFail() {
  return {
    type: GET_ALL_USER_IT_DEPARTMENT_FAIL,
  }
}

export function resetMaintenanceTeam() {
  return {
    type: RESET_MAINTENANCE_TEAM,
  }
}

export default {
  getListMaintenanceTeamStart,
  getListMaintenanceTeamSuccess,
  getListMaintenanceTeamError,
  getDetailMaintenanceTeamStart,
  getDetailMaintenanceTeamSuccess,
  getDetailMaintenanceTeamError,
  createMaintenanceTeamStart,
  createMaintenanceTeamSuccess,
  createMaintenanceTeamError,
  updateMaintenanceTeamStart,
  updateMaintenanceTeamSuccess,
  updateMaintenanceTeamError,
  deleteMaintenanceTeamStart,
  deleteMaintenanceTeamSuccess,
  deleteMaintenanceTeamError,
  getAllUserItDepartment,
  getAllUserItDepartmentSuccess,
  getAllUserItDepartmentFail,
  resetMaintenanceTeam,
}

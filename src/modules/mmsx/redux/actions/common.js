export const MMSX_GET_FACTORY_LIST_START = 'MMSX_GET_FACTORY_LIST_START'
export const MMSX_GET_FACTORY_LIST_SUCCESS = 'MMSX_GET_FACTORY_LIST_SUCCESS'
export const MMSX_GET_FACTORY_LIST_FAIL = 'MMSX_GET_FACTORY_LIST_FAIL'
export const MMSX_GET_LIST_MAINTENANCE_TEAM_START =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_START'
export const MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS'
export const MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR =
  'MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR'
export const MMSX_GET_MO_BY_FACTORY = 'MMSX_GET_MO_BY_FACTORY'
export const MMSX_GET_MO_BY_FACTORY_SUCCESS = 'MMSX_GET_MO_BY_FACTORY_SUCCESS'
export const MMSX_GET_MO_BY_FACTORY_FAILED = 'MMSX_GET_MO_BY_FACTORY_FAILED'

export function getFactoryList(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_FACTORY_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}
export function getFactoryListSuccess(payload) {
  return {
    type: MMSX_GET_FACTORY_LIST_SUCCESS,
    payload,
  }
}
export function getFactoryListFail() {
  return {
    type: MMSX_GET_FACTORY_LIST_FAIL,
  }
}

export function getListMaintenanceTeamStart(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_LIST_MAINTENANCE_TEAM_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getListMaintenanceTeamSuccess(payload) {
  return {
    type: MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS,
    payload,
  }
}

export function getListMaintenanceTeamError(payload) {
  return {
    type: MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR,
    payload,
  }
}

/* Get mo by factory */
export function getMoByFactory(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_MO_BY_FACTORY,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getMoByFactorySuccess(payload) {
  return {
    type: MMSX_GET_MO_BY_FACTORY_SUCCESS,
    payload: payload,
  }
}

export function getMoByFactoryFailed() {
  return {
    type: MMSX_GET_MO_BY_FACTORY_FAILED,
  }
}

export default {
  getFactoryList,
  getFactoryListFail,
  getFactoryListSuccess,
  getListMaintenanceTeamError,
  getListMaintenanceTeamStart,
  getListMaintenanceTeamSuccess,
  getMoByFactorySuccess,
  getMoByFactoryFailed,
  getMoByFactory,
}

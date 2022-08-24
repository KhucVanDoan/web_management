export const MMSX_GET_DEFINE_UNIT_LIST_START = 'MMSX_GET_DEFINE_UNIT_LIST_START'
export const MMSX_GET_DEFINE_UNIT_LIST_SUCCESS =
  'MMSX_GET_DEFINE_UNIT_LIST_SUCCESS'
export const MMSX_GET_DEFINE_UNIT_LIST_FAIL = 'MMSX_GET_DEFINE_UNIT_LIST_FAIL'

export const MMSX_CREATE_UNIT_START = 'MMSX_CREATE_UNIT_START'
export const MMSX_CREATE_UNIT_SUCCESS = 'MMSX_CREATE_UNIT_SUCCESS'
export const MMSX_CREATE_UNIT_FAIL = 'MMSX_CREATE_UNIT_FAIL'

export const MMSX_GET_DEFINE_UNIT_START = 'MMSX_GET_DEFINE_UNIT_START'
export const MMSX_GET_DEFINE_UNIT_SUCCESS = 'MMSX_GET_DEFINE_UNIT_SUCCESS'
export const MMSX_GET_DEFINE_UNIT_FAIL = 'MMSX_GET_DEFINE_UNIT_FAIL'

export const MMSX_UPDATE_UNIT_START = 'MMSX_UPDATE_UNIT_START'
export const MMSX_UPDATE_UNIT_SUCCESS = 'MMSX_UPDATE_UNIT_SUCCESS'
export const MMSX_UPDATE_UNIT_FAIL = 'MMSX_UPDATE_UNIT_FAIL'

export const MMSX_DELETE_UNIT_START = 'MMSX_DELETE_UNIT_START'
export const MMSX_DELETE_UNIT_SUCCESS = 'MMSX_DELETE_UNIT_SUCCESS'
export const MMSX_DELETE_UNIT_FAIL = 'MMSX_DELETE_UNIT_FAIL'

export const MMSX_RESET_STATE_UNIT = 'MMSX_RESET_STATE_UNIT'

export function getDefineUnitList(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEFINE_UNIT_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDefineUnitListSuccess(payload) {
  return {
    type: MMSX_GET_DEFINE_UNIT_LIST_SUCCESS,
    payload,
  }
}

export function getDefineUnitListFail() {
  return {
    type: MMSX_GET_DEFINE_UNIT_LIST_FAIL,
  }
}

export function createUnit(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_UNIT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createUnitSuccess(payload) {
  return {
    type: MMSX_CREATE_UNIT_SUCCESS,
    payload,
  }
}

export function createUnitFail() {
  return {
    type: MMSX_CREATE_UNIT_FAIL,
  }
}

export function getDetailUnit(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEFINE_UNIT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailUnitSuccess(payload) {
  return {
    type: MMSX_GET_DEFINE_UNIT_SUCCESS,
    payload,
  }
}

export function getDetailUnitFail() {
  return {
    type: MMSX_GET_DEFINE_UNIT_FAIL,
  }
}

export function updateUnit(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_UNIT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateUnitSuccess(payload) {
  return {
    type: MMSX_UPDATE_UNIT_SUCCESS,
    payload,
  }
}

export function updateUnitFail() {
  return {
    type: MMSX_UPDATE_UNIT_FAIL,
  }
}

export function deleteUnit(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_UNIT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteUnitSuccess(payload) {
  return {
    type: MMSX_DELETE_UNIT_SUCCESS,
    payload,
  }
}

export function deleteUnitFail() {
  return {
    type: MMSX_DELETE_UNIT_FAIL,
  }
}

export function resetStateDefineUnit() {
  return {
    type: MMSX_RESET_STATE_UNIT,
  }
}

export default {
  getDefineUnitList,
  getDefineUnitListSuccess,
  getDefineUnitListFail,
  createUnit,
  createUnitSuccess,
  createUnitFail,
  getDetailUnit,
  getDetailUnitSuccess,
  getDetailUnitFail,
  updateUnit,
  updateUnitSuccess,
  updateUnitFail,
  deleteUnit,
  deleteUnitSuccess,
  deleteUnitFail,
  resetStateDefineUnit,
}

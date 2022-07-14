export const MMSX_SEARCH_DEFECT_LIST_START = 'MMSX_SEARCH_DEFECT_LIST_START'
export const MMSX_SEARCH_DEFECT_LIST_SUCCESS = 'MMSX_SEARCH_DEFECT_LIST_SUCCESS'
export const MMSX_SEARCH_DEFECT_LIST_FAIL = 'MMSX_SEARCH_DEFECT_LIST_FAIL'

export const MMSX_CREATE_DEFECT_START = 'MMSX_CREATE_DEFECT_START'
export const MMSX_CREATE_DEFECT_SUCCESS = 'MMSX_CREATE_DEFECT_SUCCESS'
export const MMSX_CREATE_DEFECT_FAIL = 'MMSX_CREATE_DEFECT_FAIL'

export const MMSX_GET_DEFECT_START = 'MMSX_GET_DEFECT_START'
export const MMSX_GET_DEFECT_SUCCESS = 'MMSX_GET_DEFECT_SUCCESS'
export const MMSX_GET_DEFECT_FAIL = 'MMSX_GET_DEFECT_FAIL'

export const MMSX_UPDATE_DEFECT_START = 'MMSX_UPDATE_DEFECT_START'
export const MMSX_UPDATE_DEFECT_SUCCESS = 'MMSX_UPDATE_DEFECT_SUCCESS'
export const MMSX_UPDATE_DEFECT_FAIL = 'MMSX_UPDATE_DEFECT_FAIL'

export const MMSX_DELETE_DEFECT_START = 'MMSX_DELETE_DEFECT_START'
export const MMSX_DELETE_DEFECT_SUCCESS = 'MMSX_DELETE_DEFECT_SUCCESS'
export const MMSX_DELETE_DEFECT_FAIL = 'MMSX_DELETE_DEFECT_FAIL'

export const MMSX_RESET_DEFECT_STATE = 'MMSX_RESET_DEFECT_STATE'
export function searchDefectList(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEFECT_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDefectListSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEFECT_LIST_SUCCESS,
    payload,
  }
}

export function searchDefectListFail() {
  return {
    type: MMSX_SEARCH_DEFECT_LIST_FAIL,
  }
}

export function createDefect(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEFECT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createDefectSuccess(payload) {
  return {
    type: MMSX_CREATE_DEFECT_SUCCESS,
    payload,
  }
}

export function createDefectFail() {
  return {
    type: MMSX_CREATE_DEFECT_FAIL,
  }
}

export function getDefect(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEFECT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDefectSuccess(payload) {
  return {
    type: MMSX_GET_DEFECT_SUCCESS,
    payload,
  }
}

export function getDefectFail() {
  return {
    type: MMSX_GET_DEFECT_FAIL,
  }
}

export function updateDefect(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEFECT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateDefectSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEFECT_SUCCESS,
    payload,
  }
}

export function updateDefectFail() {
  return {
    type: MMSX_UPDATE_DEFECT_FAIL,
  }
}

export function deleteDefect(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_DEFECT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteDefectSuccess(payload) {
  return {
    type: MMSX_DELETE_DEFECT_SUCCESS,
    payload,
  }
}

export function deleteDefectFail() {
  return {
    type: MMSX_DELETE_DEFECT_FAIL,
  }
}

export function resetDefectState() {
  return {
    type: MMSX_RESET_DEFECT_STATE,
  }
}

export default {
  createDefect,
  createDefectSuccess,
  createDefectFail,
  searchDefectList,
  searchDefectListSuccess,
  searchDefectListFail,
  updateDefect,
  updateDefectSuccess,
  updateDefectFail,
  deleteDefect,
  deleteDefectFail,
  deleteDefectSuccess,
  resetDefectState,
  getDefect,
  getDefectSuccess,
  getDefectFail,
}

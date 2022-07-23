export const SEARCH_MAINTAINANCE_PROGRESS = 'MMSX_SEARCH_MAINTAINANCE_PROGRESS'
export const SEARCH_MAINTAINANCE_PROGRESS_SUCCESS =
  'MMSX_SEARCH_MAINTAINANCE_PROGRESS_SUCCESS'
export const SEARCH_MAINTAINANCE_PROGRESS_FAIL =
  'MMSX_SEARCH_MAINTAINANCE_PROGRESS_FAIL'

export const GET_DETAIL_MAINTAINANCE_PROGRESS_START =
  'MMSX_GET_DETAIL_MAINTAINANCE_PROGRESS_START'
export const GET_DETAIL_MAINTAINANCE_PROGRESS_SUCCESS =
  'MMSX_GET_DETAIL_MAINTAINANCE_PROGRESS_SUCCESS'
export const GET_DETAIL_MAINTAINANCE_PROGRESS_FAIL =
  'MMSX_GET_DETAIL_MAINTAINANCE_PROGRESS_FAIL'

export const RESET_MAINTAINANCE_PROGRESS = 'MMSX_RESET_MAINTAINANCE_PROGRESS'

export function searchMaintainanceProgress(payload, onSuccess, onError) {
  return {
    type: SEARCH_MAINTAINANCE_PROGRESS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchMaintainanceProgressSuccess(payload) {
  return {
    type: SEARCH_MAINTAINANCE_PROGRESS_SUCCESS,
    payload: payload,
  }
}

export function searchMaintainanceProgressFail() {
  return {
    type: SEARCH_MAINTAINANCE_PROGRESS_FAIL,
  }
}

export function getDetailMaintainanceProgressStart(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_MAINTAINANCE_PROGRESS_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailMaintainanceProgressSuccess(payload) {
  return {
    type: GET_DETAIL_MAINTAINANCE_PROGRESS_SUCCESS,
    payload: payload,
  }
}

export function getDetailMaintainanceProgressFail() {
  return {
    type: GET_DETAIL_MAINTAINANCE_PROGRESS_FAIL,
  }
}

export function resetMaintainanceProgress() {
  return {
    type: RESET_MAINTAINANCE_PROGRESS,
  }
}

export default {
  searchMaintainanceProgress,
  searchMaintainanceProgressSuccess,
  searchMaintainanceProgressFail,
  getDetailMaintainanceProgressStart,
  getDetailMaintainanceProgressSuccess,
  getDetailMaintainanceProgressFail,
  resetMaintainanceProgress,
}

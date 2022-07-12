export const SEARCH_MAINTAINANCE_PROGRESS = 'MMSX_SEARCH_MAINTAINANCE_PROGRESS'
export const SEARCH_MAINTAINANCE_PROGRESS_SUCCESS =
  'MMSX_SEARCH_MAINTAINANCE_PROGRESS_SUCCESS'
export const SEARCH_MAINTAINANCE_PROGRESS_FAIL =
  'MMSX_SEARCH_MAINTAINANCE_PROGRESS_FAIL'

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

export default {
  searchMaintainanceProgress,
  searchMaintainanceProgressSuccess,
  searchMaintainanceProgressFail,
}

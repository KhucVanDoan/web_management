export const GET_PLAN_LIST = 'MMSX_GET_PLAN_LIST'
export const GET_PLAN_LIST_SUCCESS = 'MMSX_GET_PLAN_LIST_SUCCESS'
export const GET_PLAN_LIST_FAIL = 'MMSX_GET_PLAN_LIST_FAIL'

export function getPlanList(payload, onSuccess, onError) {
  return {
    type: GET_PLAN_LIST,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getPlanListSuccess(payload) {
  return {
    type: GET_PLAN_LIST_SUCCESS,
    payload,
  }
}

export function getPlanListFail(payload) {
  return {
    type: GET_PLAN_LIST_FAIL,
    payload,
  }
}

export default {
  getPlanList,
  getPlanListSuccess,
  getPlanListFail,
}

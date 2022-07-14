import {
  GET_PLAN_LIST,
  GET_PLAN_LIST_FAIL,
  GET_PLAN_LIST_SUCCESS,
} from '~/modules/mmsx/redux/actions/plan-list'

const initialState = {
  isLoading: false,
  planList: [],
  meta: {},
}

export default function planList(state = initialState, action) {
  switch (action.type) {
    case GET_PLAN_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PLAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        planList: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_PLAN_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

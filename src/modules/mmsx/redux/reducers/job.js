import {
  SEARCH_JOB_LIST_START,
  SEARCH_JOB_LIST_SUCCESS,
  SEARCH_JOB_LIST_FAIL,
  GET_JOB_LIST_START,
  GET_JOB_LIST_SUCCESS,
  GET_JOB_LIST_FAIL,
  GET_JOB_DETAIL_START,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAIL,
  UPDATE_PLAN_START,
  RESET_JOB,
  DELETE_JOB_FAIL,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_START,
} from '~/modules/mmsx/redux/actions/job'

const initialState = {
  isLoading: false,
  jobLists: [],
  jobDetail: {},
  meta: {},
}

export default function job(state = initialState, action) {
  switch (action.type) {
    case SEARCH_JOB_LIST_START:
    case GET_JOB_LIST_START:
    case UPDATE_PLAN_START:
    case GET_JOB_DETAIL_START:
    case DELETE_JOB_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobLists: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_JOB_LIST_FAIL:
    case UPDATE_PLAN_FAIL:
    case UPDATE_PLAN_SUCCESS:
    case SEARCH_JOB_LIST_FAIL:
    case GET_JOB_DETAIL_FAIL:
    case DELETE_JOB_FAIL:
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetail: action?.payload,
        isLoading: false,
      }
    case SEARCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobLists: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case RESET_JOB:
      return {
        ...state,
        jobDetail: {},
      }
    default:
      return state
  }
}

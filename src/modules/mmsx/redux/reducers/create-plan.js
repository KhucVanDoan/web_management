import {
  GET_CREATE_PLAN_LIST,
  GET_CREATE_PLAN_LIST_FAIL,
  GET_CREATE_PLAN_LIST_SUCCESS,
  REJECT_PLAN_START,
  REJECT_PLAN_FAIL,
  REJECT_PLAN_SUCCESS,
  CONFIRM_PLAN_FAIL,
  CONFIRM_PLAN_SUCCESS,
  CONFIRM_PLAN_START,
  GET_PLAN_DETAIL_FAIL,
  GET_PLAN_DETAIL_START,
  GET_PLAN_DETAIL_SUCCESS,
  UPDATE_MAKE_PLAN_FAIL,
  UPDATE_MAKE_PLAN_START,
  UPDATE_MAKE_PLAN_SUCCESS,
  DELETE_MAKE_PLAN_FAIL,
  DELETE_MAKE_PLAN_SUCCESS,
  DELETE_MAKE_PLAN_START,
  GET_GANTT_CHART_DATA,
  GET_GANTT_CHART_DATA_FAIL,
  GET_GANTT_CHART_DATA_SUCCESS,
  RESET_STATE_CREATE_PLAN,
  GET_JOB_DRAFT_LIST,
  GET_JOB_DRAFT_LIST_SUCCESS,
  GET_JOB_DRAFT_LIST_FAIL,
  DELETE_JOB_DRAFT_FAIL,
  DELETE_JOB_DRAFT_SUCCESS,
  DELETE_JOB_DRAFT_START,
  RESET_STATE_JOB_DRAFT,
} from '../actions/create-plan'

const initialState = {
  isLoading: false,
  createPlanList: [],
  meta: {},
  metaJobDraft: {},
  detailPlan: {},
  ganttChartData: [],
  jobDraftList: [],
}

export default function createPlanList(state = initialState, action) {
  switch (action.type) {
    case GET_CREATE_PLAN_LIST:
    case CONFIRM_PLAN_START:
    case REJECT_PLAN_START:
    case GET_PLAN_DETAIL_START:
    case UPDATE_MAKE_PLAN_START:
    case DELETE_MAKE_PLAN_START:
    case GET_GANTT_CHART_DATA:
    case GET_JOB_DRAFT_LIST:
    case DELETE_JOB_DRAFT_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_GANTT_CHART_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ganttChartData: action?.payload?.items,
      }
    case GET_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detailPlan: action?.payload?.result,
      }
    case GET_CREATE_PLAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createPlanList: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_JOB_DRAFT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobDraftList: action?.payload?.items,
        metaJobDraft: action?.payload?.meta,
      }
    case GET_CREATE_PLAN_LIST_FAIL:
    case REJECT_PLAN_FAIL:
    case REJECT_PLAN_SUCCESS:
    case CONFIRM_PLAN_SUCCESS:
    case CONFIRM_PLAN_FAIL:
    case GET_PLAN_DETAIL_FAIL:
    case UPDATE_MAKE_PLAN_FAIL:
    case UPDATE_MAKE_PLAN_SUCCESS:
    case DELETE_MAKE_PLAN_SUCCESS:
    case DELETE_MAKE_PLAN_FAIL:
    case GET_GANTT_CHART_DATA_FAIL:
    case GET_JOB_DRAFT_LIST_FAIL:
    case DELETE_JOB_DRAFT_SUCCESS:
    case DELETE_JOB_DRAFT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_CREATE_PLAN:
      return {
        ...state,
        detailPlan: [],
      }
    case RESET_STATE_JOB_DRAFT:
      return {
        ...state,
        jobDraftList: [],
      }
    default:
      return state
  }
}

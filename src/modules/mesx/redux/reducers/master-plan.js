import {
  SEARCH_MASTER_PLANS_START,
  SEARCH_MASTER_PLANS_SUCCESS,
  SEARCH_MASTER_PLANS_FAILED,
  GET_MASTER_PLAN_DETAILS_START,
  GET_MASTER_PLAN_DETAILS_SUCCESS,
  GET_MASTER_PLAN_DETAILS_FAILED,
  GET_JOB_DETAILS_START,
  GET_JOB_DETAILS_SUCCESS,
  GET_JOB_DETAILS_FAILED,
  GET_MODERATION_SUGGEST_SPREAD_START,
  GET_MODERATION_SUGGEST_SPREAD_SUCCESS,
  GET_MODERATION_SUGGEST_SPREAD_FAILED,
  SUBMIT_MODERATION_INPUT_START,
  SUBMIT_MODERATION_INPUT_SUCCESS,
  SUBMIT_MODERATION_INPUT_FAILED,
  CREATE_MASTER_PLAN_FAILED,
  CREATE_MASTER_PLAN_START,
  CREATE_MASTER_PLAN_SUCCESS,
  RESET_MODERATION_SUGGEST_SPREAD,
  RESET_MASTER_PLAN_DETAIL,
  EXTEND_DEADLINE_START,
  EXTEND_DEADLINE_SUCCESS,
  EXTEND_DEADLINE_FAILED,
  GET_PRODUCING_STEP_DETAIL_START,
  GET_PRODUCING_STEP_DETAIL_SUCCESS,
  GET_PRODUCING_STEP_DETAIL_FAILED,
  UPDATE_MASTER_PLAN_FAILED,
  UPDATE_MASTER_PLAN_START,
  UPDATE_MASTER_PLAN_SUCCESS,
  PREVIEW_GANTT_MASTER_PLAN_START,
  PREVIEW_GANTT_MASTER_PLAN_SUCCESS,
  PREVIEW_GANTT_MASTER_PLAN_FAILED,
} from '~/modules/mesx/redux/actions/master-plan'

const initialState = {
  isLoading: false,
  masterPlanList: [],
  masterPlanDetails: {},
  total: null,
  moderationSuggestSpread: [],
  moderationInput: {},
  jobDetail: [],
  previewGantt: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineMasterPlan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MASTER_PLANS_START:
    case GET_MASTER_PLAN_DETAILS_START:
    case CREATE_MASTER_PLAN_START:
    case GET_MODERATION_SUGGEST_SPREAD_START:
    case SUBMIT_MODERATION_INPUT_START:
    case EXTEND_DEADLINE_START:
    case GET_PRODUCING_STEP_DETAIL_START:
    case UPDATE_MASTER_PLAN_START:
    case GET_JOB_DETAILS_START:
    case PREVIEW_GANTT_MASTER_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MASTER_PLANS_SUCCESS:
      return {
        ...state,
        masterPlanList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_MASTER_PLAN_DETAILS_SUCCESS:
      return {
        ...state,
        masterPlanDetails: action.payload,
        isLoading: false,
      }
    case GET_JOB_DETAILS_SUCCESS:
      return {
        ...state,
        jobDetail: action.payload,
        isLoading: false,
      }
    case GET_MODERATION_SUGGEST_SPREAD_SUCCESS:
    case GET_PRODUCING_STEP_DETAIL_SUCCESS:
      return {
        ...state,
        moderationSuggestSpread: action.payload,
        isLoading: false,
      }
    case SUBMIT_MODERATION_INPUT_SUCCESS:
      return {
        ...state,
        moderationInput: action.payload,
        isLoading: false,
      }
    case SEARCH_MASTER_PLANS_FAILED:
    case CREATE_MASTER_PLAN_SUCCESS:
    case GET_MODERATION_SUGGEST_SPREAD_FAILED:
    case EXTEND_DEADLINE_SUCCESS:
    case EXTEND_DEADLINE_FAILED:
    case GET_PRODUCING_STEP_DETAIL_FAILED:
    case UPDATE_MASTER_PLAN_SUCCESS:
    case UPDATE_MASTER_PLAN_FAILED:
    case PREVIEW_GANTT_MASTER_PLAN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MASTER_PLAN_DETAILS_FAILED:
    case CREATE_MASTER_PLAN_FAILED:
    case SUBMIT_MODERATION_INPUT_FAILED:
      return {
        ...state,
        masterPlanDetails: action.payload,
        isLoading: false,
      }
    case GET_JOB_DETAILS_FAILED:
      return {
        ...state,
        jobDetail: action.payload,
        isLoading: false,
      }
    case RESET_MODERATION_SUGGEST_SPREAD:
      return {
        ...state,
        moderationSuggestSpread: [],
      }
    case RESET_MASTER_PLAN_DETAIL:
      return {
        ...state,
        masterPlanDetails: {},
      }
    case PREVIEW_GANTT_MASTER_PLAN_SUCCESS:
      return {
        ...state,
        previewGantt: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

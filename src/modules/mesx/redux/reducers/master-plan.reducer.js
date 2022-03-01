import {
  SEARCH_MASTER_PLANS_START,
  SEARCH_MASTER_PLANS_SUCCESS,
  SEARCH_MASTER_PLANS_FAILED,
  GET_MASTER_PLAN_DETAILS_START,
  GET_MASTER_PLAN_DETAILS_SUCCESS,
  GET_MASTER_PLAN_DETAILS_FAILED,
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
} from '~/modules/mesx/redux/actions/master-plan.action'

const initialState = {
  isLoading: false,
  masterPlanList: [],
  masterPlanDetails: {},
  total: null,
  moderationSuggestSpread: [],
  moderationInput: {}
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
    case GET_MODERATION_SUGGEST_SPREAD_SUCCESS:
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
    case RESET_MODERATION_SUGGEST_SPREAD:
      return {
        ...state,
        moderationSuggestSpread: []
      }
    case RESET_MASTER_PLAN_DETAIL:
      return {
        ...state,
        masterPlanDetails: {}
      }
    default:
      return state
  }
}

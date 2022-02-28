import {
  SEARCH_MASTER_PLANS_START,
  SEARCH_MASTER_PLANS_SUCCESS,
  SEARCH_MASTER_PLANS_FAILED,
  GET_MASTER_PLAN_DETAILS_START,
  GET_MASTER_PLAN_DETAILS_SUCCESS,
  GET_MASTER_PLAN_DETAILS_FAILED,
  CREATE_MASTER_PLAN_FAILED,
  CREATE_MASTER_PLAN_START,
  CREATE_MASTER_PLAN_SUCCESS,
} from '~/modules/mesx/redux/actions/master-plan.action'

const initialState = {
  isLoading: false,
  masterPlanList: [],
  masterPlanDetails: {},
  total: null,
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
    case CREATE_MASTER_PLAN_START:
    case GET_MASTER_PLAN_DETAILS_START:
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
    case SEARCH_MASTER_PLANS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MASTER_PLAN_DETAILS_SUCCESS:
      return {
        ...state,
        masterPlanDetails: action.payload,
        isLoading: false,
      }
    case CREATE_MASTER_PLAN_SUCCESS:
    case CREATE_MASTER_PLAN_FAILED:
    case GET_MASTER_PLAN_DETAILS_FAILED:
      return {
        ...state,
        masterPlanDetails: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

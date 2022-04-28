import {
  SEARCH_MATERIAL_DETAIL_PLAN_START,
  SEARCH_MATERIAL_DETAIL_PLAN_SUCCESS,
  SEARCH_MATERIAL_DETAIL_PLAN_FAILED,
} from '~/modules/mesx/redux/actions/material-detail-plan'

const initialState = {
  mdpDetails: {},
}
export default function materialDetailPlan(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MATERIAL_DETAIL_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MATERIAL_DETAIL_PLAN_SUCCESS:
      return {
        ...state,
        mdpDetails: action.payload.data,
        isLoading: false,
      }
    case SEARCH_MATERIAL_DETAIL_PLAN_FAILED:
      return {
        ...state,
        mdpDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}

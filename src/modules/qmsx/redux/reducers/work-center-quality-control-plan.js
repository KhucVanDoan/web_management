import {
  SEARCH_WORK_CENTER_QC_PLAN_FAIL,
  SEARCH_WORK_CENTER_QC_PLAN_START,
  SEARCH_WORK_CENTER_QC_PLAN_SUCCESS,
  GET_WORK_CENTER_QC_PLAN_DETAIL_START,
  GET_WORK_CENTER_QC_PLAN_DETAIL_SUCCESS,
  GET_WORK_CENTER_QC_PLAN_DETAIL_FAIL,
  UPDATE_WORK_CENTER_QC_PLAN_START,
  UPDATE_WORK_CENTER_QC_PLAN_SUCCESS,
  UPDATE_WORK_CENTER_QC_PLAN_FAIL,
  RESET_WORK_CENTER_QC_PLAN_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/work-center-quality-control-plan'

const initialState = {
  isLoading: false,
  wcQcPlanList: [],
  wcQcPlanDetail: {},
  total: null,
}

export default function workCenterQualityControlPlan(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SEARCH_WORK_CENTER_QC_PLAN_START:
    case GET_WORK_CENTER_QC_PLAN_DETAIL_START:
    case UPDATE_WORK_CENTER_QC_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    //List
    case SEARCH_WORK_CENTER_QC_PLAN_SUCCESS:
      return {
        ...state,
        wcQcPlanList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_WORK_CENTER_QC_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
        wcQcPlanList: [],
        total: 0,
      }
    //Get Detail
    case GET_WORK_CENTER_QC_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        wcQcPlanDetail: action?.payload,
        isLoading: false,
      }
    case GET_WORK_CENTER_QC_PLAN_DETAIL_FAIL:
      return {
        ...state,
        wcQcPlanDetail: {},
        isLoading: false,
      }
    //Update wc-qc-plan
    case UPDATE_WORK_CENTER_QC_PLAN_SUCCESS:
    case UPDATE_WORK_CENTER_QC_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_WORK_CENTER_QC_PLAN_DETAIL_STATE:
      return {
        ...state,
        wcQcPlanDetail: {},
        isLoading: false,
      }
    default:
      return state
  }
}

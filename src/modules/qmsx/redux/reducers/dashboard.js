import {
  GET_ACTION_GROUP_DASHBOARD_FAIL,
  GET_ACTION_GROUP_DASHBOARD_START,
  GET_ACTION_GROUP_DASHBOARD_SUCCESS,
  GET_CAUSE_GROUP_DASHBOARD_FAIL,
  GET_CAUSE_GROUP_DASHBOARD_START,
  GET_CAUSE_GROUP_DASHBOARD_SUCCESS,
  GET_ERROR_GROUP_DASHBOARD_FAIL,
  GET_ERROR_GROUP_DASHBOARD_START,
  GET_ERROR_GROUP_DASHBOARD_SUCCESS,
  GET_ERROR_REPORT_STATUS_DASHBOARD_FAIL,
  GET_ERROR_REPORT_STATUS_DASHBOARD_START,
  GET_ERROR_REPORT_STATUS_DASHBOARD_SUCCESS,
  GET_IN_PROGRESS_MO_LIST_DASHBOARD_FAIL,
  GET_IN_PROGRESS_MO_LIST_DASHBOARD_START,
  GET_IN_PROGRESS_MO_LIST_DASHBOARD_SUCCESS,
  GET_INPUT_QUALITY_DASHBOARD_FAIL,
  GET_INPUT_QUALITY_DASHBOARD_START,
  GET_INPUT_QUALITY_DASHBOARD_SUCCESS,
  GET_ITEM_LIST_BY_MO_DASHBOARD_FAIL,
  GET_ITEM_LIST_BY_MO_DASHBOARD_START,
  GET_ITEM_LIST_BY_MO_DASHBOARD_SUCCESS,
  GET_MATERIAL_LIST_FAIL,
  GET_MATERIAL_LIST_START,
  GET_MATERIAL_LIST_SUCCESS,
  GET_OUTPUT_QUALITY_DASHBOARD_FAIL,
  GET_OUTPUT_QUALITY_DASHBOARD_START,
  GET_OUTPUT_QUALITY_DASHBOARD_SUCCESS,
  GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_FAIL,
  GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_START,
  GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_SUCCESS,
  GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_FAIL,
  GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_START,
  GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_SUCCESS,
  GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_FAIL,
  GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_START,
  GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_SUCCESS,
  GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_FAIL,
  GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_START,
  GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_SUCCESS,
  GET_QC_CHECK_ITEM_BY_PO_FAIL,
  GET_QC_CHECK_ITEM_BY_PO_START,
  GET_QC_CHECK_ITEM_BY_PO_SUCCESS,
  GET_QC_CHECK_ITEM_BY_PRO_FAIL,
  GET_QC_CHECK_ITEM_BY_PRO_START,
  GET_QC_CHECK_ITEM_BY_PRO_SUCCESS,
  GET_QC_CHECK_ITEM_BY_SO_FAIL,
  GET_QC_CHECK_ITEM_BY_SO_START,
  GET_QC_CHECK_ITEM_BY_SO_SUCCESS,
  GET_QC_CHECK_ITEM_BY_IMO_FAIL,
  GET_QC_CHECK_ITEM_BY_IMO_START,
  GET_QC_CHECK_ITEM_BY_IMO_SUCCESS,
  GET_QC_CHECK_ITEM_BY_EXO_FAIL,
  GET_QC_CHECK_ITEM_BY_EXO_START,
  GET_QC_CHECK_ITEM_BY_EXO_SUCCESS,
  GET_QC_PROGRESS_DASHBOARD_FAIL,
  GET_QC_PROGRESS_DASHBOARD_START,
  GET_QC_PROGRESS_DASHBOARD_SUCCESS,
  GET_SUMMARY_DASHBOARD_FAIL,
  GET_SUMMARY_DASHBOARD_START,
  GET_SUMMARY_DASHBOARD_SUCCESS,
} from '~/modules/qmsx/redux/actions/dashboard'

const initialState = {
  qcProgress: [],
  inputQuality: [],
  outputQuality: [],
  productionOutputQuality: [],
  productionInputQualityProductPrevious: [],
  productionInputQualityMaterial: [],
  errorGroupList: [],
  causeGroupList: [],
  actionGroupList: [],
  errorReportStatusList: [],
  orderList: [],
  itemList: [],
  moList: [],
  summary: {},
  materialList: [],
}

/**
 * Dashboard reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function dashboard(state = initialState, action) {
  switch (action.type) {
    /*** Begin Quality Control dashboard section ***/
    /** QC Progress **/
    case GET_QC_PROGRESS_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_PROGRESS_DASHBOARD_SUCCESS:
      return {
        ...state,
        qcProgress: action.payload,
        isLoading: false,
      }
    case GET_QC_PROGRESS_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Input quality **/
    case GET_INPUT_QUALITY_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_INPUT_QUALITY_DASHBOARD_SUCCESS:
      return {
        ...state,
        inputQuality: action.payload,
        isLoading: false,
      }
    case GET_INPUT_QUALITY_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Output quality **/
    case GET_OUTPUT_QUALITY_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_OUTPUT_QUALITY_DASHBOARD_SUCCESS:
      return {
        ...state,
        outputQuality: action.payload,
        isLoading: false,
      }
    case GET_OUTPUT_QUALITY_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production output quality **/
    case GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_SUCCESS:
      return {
        ...state,
        productionOutputQuality: action.payload,
        isLoading: false,
      }
    case GET_PRODUCTION_OUTPUT_QUALITY_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input quality (product of previous stage) **/
    case GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_SUCCESS:
      return {
        ...state,
        productionInputQualityProductPrevious: action.payload,
        isLoading: false,
      }
    case GET_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input quality (material) **/
    case GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_SUCCESS:
      return {
        ...state,
        productionInputQualityMaterial: action.payload,
        isLoading: false,
      }
    case GET_PRODUCTION_INPUT_QUALITY_MATERIAL_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get material list **/
    case GET_MATERIAL_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MATERIAL_LIST_SUCCESS:
      return {
        ...state,
        materialList: action.payload,
        isLoading: false,
      }
    case GET_MATERIAL_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /*** End Quality Control dashboard section ***/
    /*** Begin Error Report dashboard section ***/
    /** Error group **/
    case GET_ERROR_GROUP_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ERROR_GROUP_DASHBOARD_SUCCESS:
      return {
        ...state,
        errorGroupList: action.payload,
        isLoading: false,
      }
    case GET_ERROR_GROUP_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Cause group **/
    case GET_CAUSE_GROUP_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CAUSE_GROUP_DASHBOARD_SUCCESS:
      return {
        ...state,
        causeGroupList: action.payload,
        isLoading: false,
      }
    case GET_CAUSE_GROUP_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Action group **/
    case GET_ACTION_GROUP_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ACTION_GROUP_DASHBOARD_SUCCESS:
      return {
        ...state,
        actionGroupList: action.payload,
        isLoading: false,
      }
    case GET_ACTION_GROUP_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Error report status **/
    case GET_ERROR_REPORT_STATUS_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ERROR_REPORT_STATUS_DASHBOARD_SUCCESS:
      return {
        ...state,
        errorReportStatusList: action.payload,
        isLoading: false,
      }
    case GET_ERROR_REPORT_STATUS_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /*** End Error Report dashboard section ***/
    /** Get in-progress MO list **/
    case GET_IN_PROGRESS_MO_LIST_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_IN_PROGRESS_MO_LIST_DASHBOARD_SUCCESS:
      return {
        ...state,
        moList: action.payload,
        isLoading: false,
      }
    case GET_IN_PROGRESS_MO_LIST_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get item list by MO **/
    case GET_ITEM_LIST_BY_MO_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ITEM_LIST_BY_MO_DASHBOARD_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_ITEM_LIST_BY_MO_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get producing step list by item and MO **/
    case GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_SUCCESS:
      return {
        ...state,
        producingStepList: action.payload,
        isLoading: false,
      }
    case GET_PRODUCING_STEP_LIST_BY_ITEM_MO_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get QC check item by PO **/
    case GET_QC_CHECK_ITEM_BY_PO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_CHECK_ITEM_BY_PO_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_QC_CHECK_ITEM_BY_PO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get QC check item by SO **/
    case GET_QC_CHECK_ITEM_BY_SO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_CHECK_ITEM_BY_SO_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_QC_CHECK_ITEM_BY_SO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get QC check item by PRO **/
    case GET_QC_CHECK_ITEM_BY_PRO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_CHECK_ITEM_BY_PRO_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_QC_CHECK_ITEM_BY_PRO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get QC check item by IMO **/
    case GET_QC_CHECK_ITEM_BY_IMO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_CHECK_ITEM_BY_IMO_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_QC_CHECK_ITEM_BY_IMO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get QC check item by EXO **/
    case GET_QC_CHECK_ITEM_BY_EXO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QC_CHECK_ITEM_BY_EXO_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case GET_QC_CHECK_ITEM_BY_EXO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get summary **/
    case GET_SUMMARY_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_SUMMARY_DASHBOARD_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        isLoading: false,
      }
    case GET_SUMMARY_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

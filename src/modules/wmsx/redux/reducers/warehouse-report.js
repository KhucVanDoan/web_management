import {
  WMSX_CREATE_WAREHOUSE_REPORT_FAILED,
  WMSX_CREATE_WAREHOUSE_REPORT_START,
  WMSX_CREATE_WAREHOUSE_REPORT_SUCCESS,
  WMSX_DELETE_WAREHOUSE_REPORT_FAILED,
  WMSX_DELETE_WAREHOUSE_REPORT_START,
  WMSX_DELETE_WAREHOUSE_REPORT_SUCCESS,
  WMSX_GET_WAREHOUSE_REPORT_DETAILS_FAILED,
  WMSX_GET_WAREHOUSE_REPORT_DETAILS_START,
  WMSX_GET_WAREHOUSE_REPORT_DETAILS_SUCCESS,
  WMSX_SEARCH_WAREHOUSE_REPORTS_FAILED,
  WMSX_SEARCH_WAREHOUSE_REPORTS_START,
  WMSX_SEARCH_WAREHOUSE_REPORTS_SUCCESS,
  WMSX_UPDATE_WAREHOUSE_REPORT_FAILED,
  WMSX_UPDATE_WAREHOUSE_REPORT_START,
  WMSX_UPDATE_WAREHOUSE_REPORT_SUCCESS,
  WMSX_RESET_WAREHOUSE_REPORT_DETAIL_STATE,
} from '~/modules/wmsx/redux/actions/warehouse-report'

const initialState = {
  isLoading: false,
  warehouseReportList: [],
  warehouseReportDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function warehouseReport(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_WAREHOUSE_REPORTS_START:
    case WMSX_CREATE_WAREHOUSE_REPORT_START:
    case WMSX_UPDATE_WAREHOUSE_REPORT_START:
    case WMSX_DELETE_WAREHOUSE_REPORT_START:
    case WMSX_GET_WAREHOUSE_REPORT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }

    case WMSX_SEARCH_WAREHOUSE_REPORTS_SUCCESS:
      return {
        ...state,
        warehouseReportList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_WAREHOUSE_REPORTS_FAILED:
      return {
        ...state,
        warehouseReportList: [],
        isLoading: false,
        total: 0,
      }

    case WMSX_CREATE_WAREHOUSE_REPORT_SUCCESS:
    case WMSX_CREATE_WAREHOUSE_REPORT_FAILED:
    case WMSX_UPDATE_WAREHOUSE_REPORT_SUCCESS:
    case WMSX_UPDATE_WAREHOUSE_REPORT_FAILED:
    case WMSX_DELETE_WAREHOUSE_REPORT_SUCCESS:
    case WMSX_DELETE_WAREHOUSE_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case WMSX_GET_WAREHOUSE_REPORT_DETAILS_SUCCESS:
      return {
        ...state,
        warehouseReportDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_WAREHOUSE_REPORT_DETAILS_FAILED:
      return {
        ...state,
        warehouseReportDetails: {},
        isLoading: false,
      }
    case WMSX_RESET_WAREHOUSE_REPORT_DETAIL_STATE:
      return {
        ...state,
        warehouseReportDetails: {},
      }
    default:
      return state
  }
}

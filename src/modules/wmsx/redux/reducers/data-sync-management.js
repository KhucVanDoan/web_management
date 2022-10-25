import {
  WMSX_SEARCH_DATA_SYNC_MANAGEMENT_FAILED,
  WMSX_SEARCH_DATA_SYNC_MANAGEMENT_START,
  WMSX_SEARCH_DATA_SYNC_MANAGEMENT_SUCCESS,
  WMSX_DATA_SYNC_MANAGEMENT_DETAIL_FAILED,
  WMSX_DATA_SYNC_MANAGEMENT_DETAIL_SUCCESS,
  WMSX_DATA_SYNC_MANAGEMENT_DETAIL_START,
  RESET_DATA_SYNC_MANAGEMENT_DETAILS_STATE,
  WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START,
  WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS,
  WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED,
  WMSX_REJECT_DATA_SYNC_MANAGEMENT_START,
  WMSX_REJECT_DATA_SYNC_MANAGEMENT_SUCCESS,
  WMSX_REJECT_DATA_SYNC_MANAGEMENT_FAILED,
  WMSX_RETRY_DATA_SYNC_MANAGEMENT_START,
  WMSX_RETRY_DATA_SYNC_MANAGEMENT_SUCCESS,
  WMSX_RETRY_DATA_SYNC_MANAGEMENT_FAILED,
} from '~/modules/wmsx/redux/actions/data-sync-management'

const initialState = {
  isLoading: false,
  dataSyncManagementList: [],
  dataSyncManagementDetail: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function dataSyncManagement(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_DATA_SYNC_MANAGEMENT_START:
    case WMSX_DATA_SYNC_MANAGEMENT_DETAIL_START:
    case WMSX_REJECT_DATA_SYNC_MANAGEMENT_START:
    case WMSX_RETRY_DATA_SYNC_MANAGEMENT_START:
    case WMSX_APPROVE_DATA_SYNC_MANAGEMENT_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_DATA_SYNC_MANAGEMENT_SUCCESS:
      return {
        ...state,
        dataSyncManagementList: action.payload?.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_DATA_SYNC_MANAGEMENT_DETAIL_SUCCESS:
      return {
        ...state,
        dataSyncManagementDetail: action.payload,
        isLoading: false,
      }
    case WMSX_SEARCH_DATA_SYNC_MANAGEMENT_FAILED:
    case WMSX_DATA_SYNC_MANAGEMENT_DETAIL_FAILED:
    case WMSX_REJECT_DATA_SYNC_MANAGEMENT_FAILED:
    case WMSX_REJECT_DATA_SYNC_MANAGEMENT_SUCCESS:
    case WMSX_RETRY_DATA_SYNC_MANAGEMENT_FAILED:
    case WMSX_RETRY_DATA_SYNC_MANAGEMENT_SUCCESS:
    case WMSX_APPROVE_DATA_SYNC_MANAGEMENT_SUCCESS:
    case WMSX_APPROVE_DATA_SYNC_MANAGEMENT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DATA_SYNC_MANAGEMENT_DETAILS_STATE:
      return {
        ...state,
        dataSyncManagementList: [],
        dataSyncManagementDetail: {},
      }
    default:
      return state
  }
}

import {
  CREATE_STORAGE_PERIOD_FAILED,
  CREATE_STORAGE_PERIOD_START,
  CREATE_STORAGE_PERIOD_SUCCESS,
  DELETE_STORAGE_PERIOD_FAILED,
  DELETE_STORAGE_PERIOD_START,
  DELETE_STORAGE_PERIOD_SUCCESS,
  GET_STORAGE_PERIOD_DETAILS_FAILED,
  GET_STORAGE_PERIOD_DETAILS_START,
  GET_STORAGE_PERIOD_DETAILS_SUCCESS,
  SEARCH_STORAGE_PERIODS_FAILED,
  SEARCH_STORAGE_PERIODS_START,
  SEARCH_STORAGE_PERIODS_SUCCESS,
  UPDATE_STORAGE_PERIOD_FAILED,
  UPDATE_STORAGE_PERIOD_START,
  UPDATE_STORAGE_PERIOD_SUCCESS,
  CONFIRM_STORAGE_PERIOD_FAILED,
  CONFIRM_STORAGE_PERIOD_START,
  CONFIRM_STORAGE_PERIOD_SUCCESS,
  REJECT_STORAGE_PERIOD_FAILED,
  REJECT_STORAGE_PERIOD_START,
  REJECT_STORAGE_PERIOD_SUCCESS,
  RESET_STORAGE_PERIOD_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/set-storage-period'

const initialState = {
  isLoading: false,
  storagePeriodList: [],
  storagePeriodDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function setStoragePeriod(state = initialState, action) {
  switch (action.type) {
    case SEARCH_STORAGE_PERIODS_START:
    case CREATE_STORAGE_PERIOD_START:
    case UPDATE_STORAGE_PERIOD_START:
    case DELETE_STORAGE_PERIOD_START:
    case CONFIRM_STORAGE_PERIOD_START:
    case REJECT_STORAGE_PERIOD_START:
    case GET_STORAGE_PERIOD_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_STORAGE_PERIODS_SUCCESS:
      return {
        ...state,
        storagePeriodList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_STORAGE_PERIODS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_STORAGE_PERIOD_FAILED:
    case REJECT_STORAGE_PERIOD_SUCCESS:
    case CONFIRM_STORAGE_PERIOD_FAILED:
    case CONFIRM_STORAGE_PERIOD_SUCCESS:
    case CREATE_STORAGE_PERIOD_SUCCESS:
    case CREATE_STORAGE_PERIOD_FAILED:
    case UPDATE_STORAGE_PERIOD_SUCCESS:
    case UPDATE_STORAGE_PERIOD_FAILED:
    case DELETE_STORAGE_PERIOD_SUCCESS:
    case DELETE_STORAGE_PERIOD_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_STORAGE_PERIOD_DETAILS_SUCCESS:
      return {
        ...state,
        storagePeriodDetails: action.payload,
        isLoading: false,
      }
    case GET_STORAGE_PERIOD_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STORAGE_PERIOD_DETAILS_STATE:
      return {
        ...state,
        storagePeriodDetails: {},
      }
    default:
      return state
  }
}

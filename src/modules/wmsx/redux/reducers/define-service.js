import {
  WMSX_SEARCH_SERVICES_FAILED,
  WMSX_SEARCH_SERVICES_START,
  WMSX_SEARCH_SERVICES_SUCCESS,
  WMSX_CREATE_SERVICE_FAILED,
  WMSX_CREATE_SERVICE_START,
  WMSX_CREATE_SERVICE_SUCCESS,
  WMSX_DELETE_SERVICE_FAILED,
  WMSX_DELETE_SERVICE_START,
  WMSX_DELETE_SERVICE_SUCCESS,
  WMSX_GET_SERVICE_DETAIL_FAILED,
  WMSX_GET_SERVICE_DETAIL_START,
  WMSX_GET_SERVICE_DETAIL_SUCCESS,
  WMSX_UPDATE_SERVICE_FAILED,
  WMSX_UPDATE_SERVICE_START,
  WMSX_UPDATE_SERVICE_SUCCESS,
  WMSX_CONFIRM_SERVICE_START,
  WMSX_CONFIRM_SERVICE_SUCCESS,
  WMSX_CONFIRM_SERVICE_FAILED,
  WMSX_REJECT_SERVICE_FAILED,
  WMSX_REJECT_SERVICE_START,
  WMSX_REJECT_SERVICE_SUCCESS,
  WMSX_GET_ALL_SERVICES_DETAIL_START,
  WMSX_GET_ALL_SERVICES_DETAIL_SUCCESS,
  WMSX_GET_ALL_SERVICES_DETAIL_FAILED,
  WMSX_RESET_SERVICE_DETAIL_STATE,
} from '../actions/define-service'

const initialState = {
  isLoading: false,
  serviceList: [],
  serviceDetails: {},
  total: null,
  serviceDetailList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineService(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_SERVICES_START:
    case WMSX_GET_SERVICE_DETAIL_START:
    case WMSX_CREATE_SERVICE_START:
    case WMSX_UPDATE_SERVICE_START:
    case WMSX_DELETE_SERVICE_START:
    case WMSX_CONFIRM_SERVICE_START:
    case WMSX_REJECT_SERVICE_START:
    case WMSX_GET_ALL_SERVICES_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }

    case WMSX_SEARCH_SERVICES_SUCCESS:
      return {
        ...state,
        serviceList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_SEARCH_SERVICES_FAILED:
      return {
        ...state,
        serviceList: [],
        isLoading: false,
        total: 0,
      }
    case WMSX_GET_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        serviceDetails: action.payload,
        isLoading: false,
      }
    case WMSX_GET_SERVICE_DETAIL_FAILED:
      return {
        ...state,
        serviceDetails: {},
        isLoading: false,
      }
    case WMSX_CREATE_SERVICE_SUCCESS:
    case WMSX_CREATE_SERVICE_FAILED:
    case WMSX_UPDATE_SERVICE_SUCCESS:
    case WMSX_UPDATE_SERVICE_FAILED:
    case WMSX_DELETE_SERVICE_SUCCESS:
    case WMSX_DELETE_SERVICE_FAILED:
    case WMSX_CONFIRM_SERVICE_FAILED:
    case WMSX_CONFIRM_SERVICE_SUCCESS:
    case WMSX_REJECT_SERVICE_FAILED:
    case WMSX_REJECT_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_ALL_SERVICES_DETAIL_SUCCESS:
      return {
        ...state,
        serviceDetailList: action.payload,
        isLoading: false,
      }
    case WMSX_GET_ALL_SERVICES_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_RESET_SERVICE_DETAIL_STATE:
      return {
        ...state,
        serviceDetails: {},
      }
    default:
      return state
  }
}

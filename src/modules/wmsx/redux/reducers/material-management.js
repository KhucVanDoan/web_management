import {
  CREATE_MATERIAL_FAILED,
  CREATE_MATERIAL_START,
  CREATE_MATERIAL_SUCCESS,
  DELETE_MATERIAL_FAILED,
  DELETE_MATERIAL_START,
  DELETE_MATERIAL_SUCCESS,
  GET_MATERIAL_DETAILS_FAILED,
  GET_MATERIAL_DETAILS_START,
  GET_MATERIAL_DETAILS_SUCCESS,
  SEARCH_MATERIALS_FAILED,
  SEARCH_MATERIALS_START,
  SEARCH_MATERIALS_SUCCESS,
  UPDATE_MATERIAL_FAILED,
  UPDATE_MATERIAL_START,
  UPDATE_MATERIAL_SUCCESS,
  UPDATE_WAREHOUSE_SOURCE_FAILED,
  UPDATE_WAREHOUSE_SOURCE_START,
  UPDATE_WAREHOUSE_SOURCE_SUCCESS,
  CONFIRM_MATERIAL_FAILED,
  CONFIRM_MATERIAL_START,
  CONFIRM_MATERIAL_SUCCESS,
  REJECT_MATERIAL_FAILED,
  REJECT_MATERIAL_START,
  REJECT_MATERIAL_SUCCESS,
  RESET_MATERIAL_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/material-management'

const initialState = {
  isLoading: false,
  materialList: [],
  materialDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function materialManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MATERIALS_START:
    case CREATE_MATERIAL_START:
    case UPDATE_MATERIAL_START:
    case DELETE_MATERIAL_START:
    case CONFIRM_MATERIAL_START:
    case REJECT_MATERIAL_START:
    case UPDATE_WAREHOUSE_SOURCE_START:
    case GET_MATERIAL_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MATERIALS_SUCCESS:
      return {
        ...state,
        materialList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_MATERIALS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_MATERIAL_FAILED:
    case REJECT_MATERIAL_SUCCESS:
    case CONFIRM_MATERIAL_FAILED:
    case CONFIRM_MATERIAL_SUCCESS:
    case CREATE_MATERIAL_SUCCESS:
    case CREATE_MATERIAL_FAILED:
    case UPDATE_MATERIAL_SUCCESS:
    case UPDATE_MATERIAL_FAILED:
    case DELETE_MATERIAL_SUCCESS:
    case DELETE_MATERIAL_FAILED:
    case UPDATE_WAREHOUSE_SOURCE_SUCCESS:
    case UPDATE_WAREHOUSE_SOURCE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MATERIAL_DETAILS_SUCCESS:
      return {
        ...state,
        materialDetails: action.payload,
        isLoading: false,
      }
    case GET_MATERIAL_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_MATERIAL_DETAILS_STATE:
      return {
        ...state,
        materialDetails: {},
      }
    default:
      return state
  }
}

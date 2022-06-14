import {
  SEARCH_TEMPLATE_SECTORS_FAILED,
  SEARCH_TEMPLATE_SECTORS_START,
  SEARCH_TEMPLATE_SECTORS_SUCCESS,
  CREATE_TEMPLATE_SECTOR_FAILED,
  CREATE_TEMPLATE_SECTOR_START,
  CREATE_TEMPLATE_SECTOR_SUCCESS,
  DELETE_TEMPLATE_SECTOR_FAILED,
  DELETE_TEMPLATE_SECTOR_START,
  DELETE_TEMPLATE_SECTOR_SUCCESS,
  GET_TEMPLATE_SECTOR_DETAIL_FAILED,
  GET_TEMPLATE_SECTOR_DETAIL_START,
  GET_TEMPLATE_SECTOR_DETAIL_SUCCESS,
  UPDATE_TEMPLATE_SECTOR_FAILED,
  UPDATE_TEMPLATE_SECTOR_START,
  UPDATE_TEMPLATE_SECTOR_SUCCESS,
  RESET_STATE_TEMPLATE_SECTOR,
} from '../actions/define-template-sector'

const initialState = {
  isLoading: false,
  templateSectorList: [],
  templateSectorDetails: {},
  total: null,
  importLog: {},
  createdId: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function templateSector(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE_SECTORS_START:
    case GET_TEMPLATE_SECTOR_DETAIL_START:
    case CREATE_TEMPLATE_SECTOR_START:
    case UPDATE_TEMPLATE_SECTOR_START:
    case DELETE_TEMPLATE_SECTOR_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_TEMPLATE_SECTORS_SUCCESS:
      return {
        ...state,
        templateSectorList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_TEMPLATE_SECTORS_FAILED:
      return {
        ...state,
        templateSectorList: [],
        isLoading: false,
        total: 0,
      }
    case GET_TEMPLATE_SECTOR_DETAIL_SUCCESS:
      return {
        ...state,
        templateSectorDetails: action.payload,
        isLoading: false,
      }
    case CREATE_TEMPLATE_SECTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createdId: action.payload,
      }
    case GET_TEMPLATE_SECTOR_DETAIL_FAILED:
      return {
        ...state,
        templateSectorDetails: {},
        isLoading: false,
      }
    case CREATE_TEMPLATE_SECTOR_FAILED:
    case UPDATE_TEMPLATE_SECTOR_SUCCESS:
    case UPDATE_TEMPLATE_SECTOR_FAILED:
    case DELETE_TEMPLATE_SECTOR_SUCCESS:
    case DELETE_TEMPLATE_SECTOR_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_TEMPLATE_SECTOR:
      return {
        ...state,
        templateSectorDetails: {},
      }
    default:
      return state
  }
}

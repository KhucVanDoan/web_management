import {
  MMSX_CREATE_ATTRIBUTE_MAINTENANCE_FAIL,
  MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START,
  MMSX_CREATE_ATTRIBUTE_MAINTENANCE_SUCCESS,
  MMSX_DELETE_ATTRIBUTE_MAINTENANCE_FAIL,
  MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START,
  MMSX_DELETE_ATTRIBUTE_MAINTENANCE_SUCCESS,
  MMSX_GET_ATTRIBUTE_MAINTENANCE_FAIL,
  MMSX_GET_ATTRIBUTE_MAINTENANCE_SUCCESS,
  MMSX_RESET_ATTRIBUTE_MAINTENANCE_STATE,
  MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START,
  MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_SUCCESS,
  MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_FAIL,
  MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START,
  MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_SUCCESS,
} from '../actions/attribute-maintenance'
import { MMSX_GET_ATTRIBUTE_MAINTAIN_START } from '../actions/common'

const initialState = {
  isLoading: false,
  attributeMaintainList: [],
  attributeMaintainDetail: {},
  total: null,
}
export default function attributeMaintenance(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START:
    case MMSX_GET_ATTRIBUTE_MAINTAIN_START:
    case MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START:
    case MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START:
    case MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_SUCCESS:
      return {
        ...state,
        attributeMaintainList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case MMSX_GET_ATTRIBUTE_MAINTENANCE_SUCCESS:
      return {
        ...state,
        attributeMaintainDetail: action?.payload,
        isLoading: false,
      }
    case MMSX_DELETE_ATTRIBUTE_MAINTENANCE_SUCCESS:
    case MMSX_DELETE_ATTRIBUTE_MAINTENANCE_FAIL:
    case MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_FAIL:
    case MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_SUCCESS:
    case MMSX_CREATE_ATTRIBUTE_MAINTENANCE_FAIL:
    case MMSX_CREATE_ATTRIBUTE_MAINTENANCE_SUCCESS:
    case MMSX_GET_ATTRIBUTE_MAINTENANCE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_ATTRIBUTE_MAINTENANCE_STATE:
      return {
        ...state,
        attributeMaintainDetail: {},
      }
    default:
      return state
  }
}

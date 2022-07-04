import {
  MMSX_GET_FACTORY_LIST_START,
  MMSX_GET_FACTORY_LIST_FAIL,
  MMSX_GET_FACTORY_LIST_SUCCESS,
  MMSX_GET_LIST_MAINTENANCE_TEAM_START,
  MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR,
  MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS,
  MMSX_GET_MO_BY_FACTORY,
  MMSX_GET_MO_BY_FACTORY_FAILED,
  MMSX_GET_MO_BY_FACTORY_SUCCESS,
  MMSX_GET_ALL_SUPPLIES_CONFIRM_START,
  MMSX_GET_ALL_SUPPLIES_CONFIRM_SUCCESS,
  MMSX_GET_ALL_SUPPLIES_CONFIRM_FAILED,
  MMSX_GET_ATTRIBUTE_MAINTAIN_FAILED,
  MMSX_GET_ATTRIBUTE_MAINTAIN_START,
  MMSX_GET_ATTRIBUTE_MAINTAIN_SUCCESS,
  MMSX_GET_VENDORS_FAILED,
  MMSX_GET_VENDORS_START,
  MMSX_GET_VENDORS_SUCCESS,
  GET_RESPONSIBLE_SUBJECT_START,
  GET_RESPONSIBLE_SUBJECT_SUCCESS,
  GET_RESPONSIBLE_SUBJECT_FAILED,
  GET_ITEM_UNITS_START,
  GET_ITEM_UNITS_SUCCESS,
  GET_ITEM_UNITS_FAILED,
} from '../actions/common'

const initialState = {
  isLoading: false,
  factoryList: [],
  maintenanceTeams: [],
  moListByFactory: [],
  suppliesList: [],
  attributeMaintainList: [],
  responsibleSubject: {},
  vendorList: [],
  itemsUnitList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function commonManagement(state = initialState, action) {
  switch (action.type) {
    case MMSX_GET_FACTORY_LIST_START:
    case GET_RESPONSIBLE_SUBJECT_START:
    case MMSX_GET_LIST_MAINTENANCE_TEAM_START:
    case MMSX_GET_MO_BY_FACTORY:
    case MMSX_GET_ALL_SUPPLIES_CONFIRM_START:
    case MMSX_GET_ATTRIBUTE_MAINTAIN_START:
    case MMSX_GET_VENDORS_START:
      return {
        ...state,
      }
    case MMSX_GET_FACTORY_LIST_SUCCESS:
      return {
        ...state,
        factoryList: action?.payload,
      }
    case MMSX_GET_LIST_MAINTENANCE_TEAM_SUCCESS:
      return {
        ...state,
        maintenanceTeams: action?.payload?.items,
      }
    case MMSX_GET_MO_BY_FACTORY_SUCCESS:
      return {
        ...state,
        moListByFactory: action?.payload?.items,
      }
    case MMSX_GET_LIST_MAINTENANCE_TEAM_ERROR:
      return {
        ...state,
        maintenanceTeams: [],
      }
    case MMSX_GET_FACTORY_LIST_FAIL:
      return {
        ...state,
        factoryList: [],
      }
    case MMSX_GET_MO_BY_FACTORY_FAILED:
      return {
        ...state,
        moListByFactory: [],
      }
    case MMSX_GET_ALL_SUPPLIES_CONFIRM_SUCCESS:
      return {
        ...state,
        suppliesList: action?.payload,
      }
    case MMSX_GET_ALL_SUPPLIES_CONFIRM_FAILED:
      return {
        ...state,
        suppliesList: [],
      }
    case MMSX_GET_ATTRIBUTE_MAINTAIN_SUCCESS:
      return {
        ...state,
        attributeMaintainList: action?.payload,
      }
    case MMSX_GET_ATTRIBUTE_MAINTAIN_FAILED:
      return {
        ...state,
        attributeMaintainList: [],
      }
    case MMSX_GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendorList: action.payload,
      }
    case MMSX_GET_VENDORS_FAILED:
      return {
        ...state,
        vendorList: [],
      }
    case GET_RESPONSIBLE_SUBJECT_SUCCESS:
      return {
        ...state,
        responsibleSubject: action?.payload,
        isLoading: false,
      }
    case GET_RESPONSIBLE_SUBJECT_FAILED:
      return {
        ...state,
        responsibleSubject: {},
        isLoading: false,
      }
    case GET_ITEM_UNITS_START:
      return {
        ...state,
      }
    case GET_ITEM_UNITS_SUCCESS:
      return {
        ...state,
        itemsUnitList: action.payload,
      }
    case GET_ITEM_UNITS_FAILED:
      return {
        ...state,
      }
    default:
      return state
  }
}

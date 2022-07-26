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
  GET_RESPONSIBLE_SUBJECT_START,
  GET_RESPONSIBLE_SUBJECT_SUCCESS,
  GET_RESPONSIBLE_SUBJECT_FAILED,
  GET_MO_BY_WORK_CENTER,
  GET_MO_BY_WORK_CENTER_FAILED,
  GET_MO_BY_WORK_CENTER_SUCCESS,
  GET_ITEM_UNITS_START,
  GET_ITEM_UNITS_SUCCESS,
  GET_ITEM_UNITS_FAILED,
  GET_USER_FAIL,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_ALL_DEVICE_FAIL,
  GET_ALL_DEVICE_SUCCESS,
  GET_ALL_DEVICE_START,
  GET_ALL_WORK_CENTER_FAILED,
  GET_ALL_WORK_CENTER_START,
  GET_ALL_WORK_CENTER_SUCCESS,
  GET_USING_DEVICE_ASSIGN_FAILED,
  GET_USING_DEVICE_ASSIGN_START,
  GET_USING_DEVICE_ASSIGN_SUCCESS,
} from '../actions/common'

const initialState = {
  isLoading: false,
  factoryList: [],
  maintenanceTeams: [],
  moListByFactory: [],
  suppliesList: [],
  attributeMaintainList: [],
  responsibleSubject: {},
  moListByWorkCenter: [],
  itemsUnitList: [],
  userList: [],
  deviceList: [],
  workCenterList: [],
  deviceAssignUsingList: [],
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
    case GET_MO_BY_WORK_CENTER:
    case GET_USER_START:
    case GET_ALL_DEVICE_START:
    case GET_ALL_WORK_CENTER_START:
    case GET_USING_DEVICE_ASSIGN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        userList: action.payload,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        userList: [],
      }
    case GET_ALL_DEVICE_SUCCESS:
      return {
        ...state,
        deviceList: action?.payload,
      }
    case GET_ALL_DEVICE_FAIL:
      return {
        ...state,
        deviceList: [],
      }
    case GET_ALL_WORK_CENTER_SUCCESS:
      return {
        ...state,
        workCenterList: action?.payload,
        isLoading: false,
      }
    case GET_ALL_WORK_CENTER_FAILED:
      return {
        ...state,
        workCenterList: [],
        isLoading: false,
      }
    case GET_USING_DEVICE_ASSIGN_SUCCESS:
      return {
        ...state,
        deviceAssignUsingList: action?.payload?.result,
        isLoading: false,
      }
    case GET_USING_DEVICE_ASSIGN_FAILED:
      return {
        ...state,
        deviceAssignUsingList: [],
        isLoading: false,
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
    case GET_MO_BY_WORK_CENTER_SUCCESS:
      return {
        ...state,
        moListByWorkCenter: action?.payload,
        isLoading: false,
      }
    case GET_MO_BY_WORK_CENTER_FAILED:
      return {
        ...state,
        moListByWorkCenter: [],
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

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
} from '../actions/common'

const initialState = {
  isLoading: false,
  factoryList: [],
  maintenanceTeams: [],
  moListByFactory: [],
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
    case MMSX_GET_LIST_MAINTENANCE_TEAM_START:
    case MMSX_GET_MO_BY_FACTORY:
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

    default:
      return state
  }
}

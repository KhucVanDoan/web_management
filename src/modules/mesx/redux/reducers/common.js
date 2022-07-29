import {
  GET_DEPARTMENTS_START,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILED,
  GET_ROLES_START,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_DETAILS_START,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILED,
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_WAREHOUSES_START,
  GET_WAREHOUSES_SUCCESS,
  GET_WAREHOUSES_FAILED,
  GET_BOMS_START,
  GET_BOMS_SUCCESS,
  GET_BOMS_FAILED,
  SEARCH_QUALITY_POINTS_START,
  SEARCH_QUALITY_POINTS_SUCCESS,
  SEARCH_QUALITY_POINTS_FAILED,
  RESET_FACTORIES_LIST_STATE,
  RESET_ITEMS,
  GET_GROUP_PERMISSIONS_FAILED,
  GET_GROUP_PERMISSIONS_START,
  GET_GROUP_PERMISSIONS_SUCCESS,
  GET_DEPARTMENTS_ROLE_FAILED,
  GET_DEPARTMENTS_ROLE_START,
  GET_DEPARTMENTS_ROLE_SUCCESS,
} from '~/modules/mesx/redux/actions/common'

const initialState = {
  isLoading: false,
  roleList: [],
  departmentList: [],
  detailList: [],
  itemList: [],
  warehouseList: [],
  warehouseSectorList: [],
  vendorList: [],
  lists: [],
  BOMList: [],
  qcList: [],
  groupPermissions: [],
  departments: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function commonManagement(state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS_START:
    case GET_ROLES_START:
    case GET_DETAILS_START:
    case GET_ITEMS_START:
    case GET_WAREHOUSES_START:
    case GET_BOMS_START:
    case SEARCH_QUALITY_POINTS_START:
    case GET_GROUP_PERMISSIONS_START:
    case GET_DEPARTMENTS_ROLE_START:
      return {
        ...state,
        isLoading: true,
      }

    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departmentList: action.payload,
        isLoading: false,
      }
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roleList: action.payload,
        isLoading: false,
      }

    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        detailList: action.payload,
        isLoading: false,
      }

    case GET_DETAILS_FAILED:
      return {
        ...state,
        detailList: [],
        isLoading: false,
      }

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
      }
    case RESET_ITEMS:
      return {
        ...state,
        itemList: [],
      }
    case GET_ITEMS_FAILED:
      return {
        ...state,
        itemList: [],
        isLoading: false,
      }
    case GET_WAREHOUSES_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSES_FAILED:
      return {
        ...state,
        warehouseList: [],
        isLoading: false,
      }

    case GET_BOMS_SUCCESS:
      return {
        ...state,
        BOMList: action.payload,
        isLoading: false,
      }
    case GET_BOMS_FAILED:
      return {
        ...state,
        BOMList: [],
        isLoading: false,
      }

    case RESET_FACTORIES_LIST_STATE:
      return {
        ...state,
        factoryList: [],
      }

    case GET_DEPARTMENTS_FAILED:
    case GET_ROLES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_QUALITY_POINTS_SUCCESS:
      return {
        ...state,
        qcList: action.payload?.list,
        isLoading: false,
      }
    case SEARCH_QUALITY_POINTS_FAILED:
      return {
        ...state,
        qcList: [],
        isLoading: false,
      }
    case GET_GROUP_PERMISSIONS_SUCCESS:
      return {
        ...state,
        groupPermissions: action.payload,
        isLoading: false,
      }
    case GET_GROUP_PERMISSIONS_FAILED:
      return {
        ...state,
        groupPermissions: [],
        isLoading: false,
      }
    case GET_DEPARTMENTS_ROLE_SUCCESS:
      return {
        ...state,
        departments: action.payload,
        isLoading: false,
      }
    case GET_DEPARTMENTS_ROLE_FAILED:
      return {
        ...state,
        departments: [],
        isLoading: false,
      }
    default:
      return state
  }
}

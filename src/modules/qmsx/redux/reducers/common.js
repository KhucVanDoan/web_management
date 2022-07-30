import {
  GET_COMPANIES_START,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILED,
  GET_ROLES_START,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_ITEM_UNITS_START,
  GET_ITEM_UNITS_SUCCESS,
  GET_ITEM_UNITS_FAILED,
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_WAREHOUSES_START,
  GET_WAREHOUSES_SUCCESS,
  GET_WAREHOUSES_FAILED,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMERS_START,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_FACTORIES_FAILED,
  GET_FACTORIES_START,
  GET_FACTORIES_SUCCESS,
  GET_ALL_ERROR_GROUP_START,
  GET_ALL_ERROR_GROUP_SUCCESS,
  GET_ALL_ERROR_GROUP_FAILED,
  GET_PRODUCTS_BY_STAGEQC_START,
  GET_PRODUCTS_BY_STAGEQC_SUCCESS,
  GET_PRODUCTS_BY_STAGEQC_FAILED,
  GET_ALL_CHECK_LIST_START,
  GET_ALL_CHECK_LIST_SUCCESS,
  GET_ALL_CHECK_LIST_FAILED,
} from '~/modules/qmsx/redux/actions/common'

const initialState = {
  isLoading: false,
  companyList: [],
  roleList: [],
  departmentList: [],
  itemUnitList: [],
  itemList: [],
  warehouseList: [],
  customerList: [],
  userList: [],
  factoryList: [],
  errorGroupList: [],
  productListByStageQC: [],
  checkListConfirmedList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function commonManagement(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES_START:
    case GET_ROLES_START:
    case GET_ITEM_UNITS_START:
    case GET_ITEMS_START:
    case GET_WAREHOUSES_START:
    case GET_CUSTOMERS_START:
    case GET_USERS_START:
    case GET_FACTORIES_START:
    case GET_ALL_ERROR_GROUP_START:
    case GET_PRODUCTS_BY_STAGEQC_START:
    case GET_ALL_CHECK_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companyList: action.payload,
        isLoading: false,
      }

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roleList: action.payload,
        isLoading: false,
      }
    case GET_ITEM_UNITS_SUCCESS:
      return {
        ...state,
        itemUnitList: action.payload,
        isLoading: false,
      }
    case GET_ITEM_UNITS_FAILED:
      return {
        ...state,
        itemUnitList: [],
        isLoading: false,
      }
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
        isLoading: false,
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

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customerList: action.payload,
        isLoading: false,
      }
    case GET_CUSTOMERS_FAILED:
      return {
        ...state,
        customerList: [],
        isLoading: false,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        userList: [],
        isLoading: false,
      }
    case GET_FACTORIES_SUCCESS:
      return {
        ...state,
        factoryList: action.payload,
        isLoading: false,
      }
    case GET_FACTORIES_FAILED:
      return {
        ...state,
        factoryList: [],
        isLoading: false,
      }
    case GET_ALL_ERROR_GROUP_SUCCESS:
      return {
        ...state,
        errorGroupList: action.payload,
        isLoading: false,
      }
    case GET_ALL_ERROR_GROUP_FAILED:
      return {
        ...state,
        errorGroupList: [],
        isLoading: false,
      }
    case GET_PRODUCTS_BY_STAGEQC_SUCCESS:
      return {
        ...state,
        productListByStageQC: action.payload,
        isLoading: false,
      }
    case GET_ALL_CHECK_LIST_SUCCESS:
      return {
        ...state,
        checkListConfirmedList: action.payload,
        isLoading: false,
      }
    case GET_ALL_CHECK_LIST_FAILED:
      return {
        ...state,
        checkListConfirmedList: [],
        isLoading: false,
      }
    case GET_PRODUCTS_BY_STAGEQC_FAILED:
    case GET_COMPANIES_FAILED:
    case GET_ROLES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

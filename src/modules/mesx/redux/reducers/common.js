import {
  GET_COMPANIES_START,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILED,
  GET_FACTORIES_BY_COMPANY_START,
  GET_FACTORIES_BY_COMPANY_SUCCESS,
  GET_FACTORIES_BY_COMPANY_FAILED,
  GET_DEPARTMENTS_START,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILED,
  GET_ROLES_START,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_WAREHOUSES_BY_FACTORIES_START,
  GET_WAREHOUSES_BY_FACTORIES_SUCCESS,
  GET_WAREHOUSES_BY_FACTORIES_FAILED,
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_DETAILS_START,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILED,
  GET_ITEM_GROUPS_START,
  GET_ITEM_GROUPS_SUCCESS,
  GET_ITEM_GROUPS_FAILED,
  GET_ITEM_TYPES_START,
  GET_ITEM_TYPES_SUCCESS,
  GET_ITEM_TYPES_FAILED,
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
  GET_VENDORS_SUCCESS,
  GET_VENDORS_FAILED,
  GET_CUSTOMERS_START,
  GET_VENDORS_START,
  GET_ALL_ITEM_DETAILS_START,
  GET_ALL_ITEM_DETAILS_SUCCESS,
  GET_ALL_ITEM_DETAILS_FAILED,
  GET_PRODUCING_STEPS_START,
  GET_PRODUCING_STEPS_SUCCESS,
  GET_PRODUCING_STEPS_FAILED,
  GET_ROUTINGS_START,
  GET_ROUTINGS_SUCCESS,
  GET_ROUTINGS_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_BOMS_START,
  GET_BOMS_SUCCESS,
  GET_BOMS_FAILED,
  GET_FACTORIES_FAILED,
  GET_FACTORIES_START,
  GET_FACTORIES_SUCCESS,
  GET_SALE_ORDERS_FAILED,
  GET_SALE_ORDERS_START,
  GET_SALE_ORDERS_SUCCESS,
  SEARCH_QUALITY_POINTS_START,
  SEARCH_QUALITY_POINTS_SUCCESS,
  SEARCH_QUALITY_POINTS_FAILED,
  GET_QUALITY_POINT_DETAILS_START,
  GET_QUALITY_POINT_DETAILS_SUCCESS,
  GET_QUALITY_POINT_DETAILS_FAILED,
  GET_QUALITY_POINTS_START,
  GET_QUALITY_POINTS_SUCCESS,
  GET_QUALITY_POINTS_FAILED,
  GET_ITEM_QUALITY_POINT_START,
  GET_ITEM_QUALITY_POINT_SUCCESS,
  GET_ITEM_QUALITY_POINT_FAILED,
  CREATE_PURCHASED_ORDER_FAILED,
  CREATE_PURCHASED_ORDER_START,
  CREATE_PURCHASED_ORDER_SUCCESS,
  RESET_ITEMS,
} from '~/modules/mesx/redux/actions/common'

const initialState = {
  isLoading: false,
  companyList: [],
  factoryByCompanyList: [],
  roleList: [],
  departmentList: [],
  warehouseByFactoryList: [],
  productList: [],
  detailList: [],
  itemGroupList: [],
  itemTypeList: [],
  itemUnitList: [],
  itemList: [],
  warehouseList: [],
  customerList: [],
  vendorList: [],
  itemDetailList: [],
  lists: [],
  routingList: [],
  userList: [],
  BOMList: [],
  factoryList: [],
  soList: [],
  qcList: [],
  qcDetails: {},
  qualityPointList: [],
  itemQualityPoint: [],
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
    case GET_FACTORIES_BY_COMPANY_START:
    case GET_DEPARTMENTS_START:
    case GET_ROLES_START:
    case GET_WAREHOUSES_BY_FACTORIES_START:
    case GET_PRODUCTS_START:
    case GET_DETAILS_START:
    case GET_ITEM_UNITS_START:
    case GET_ITEM_TYPES_START:
    case GET_ITEM_GROUPS_START:
    case GET_ITEMS_START:
    case GET_WAREHOUSES_START:
    case GET_CUSTOMERS_START:
    case GET_VENDORS_START:
    case GET_ALL_ITEM_DETAILS_START:
    case GET_PRODUCING_STEPS_START:
    case GET_ROUTINGS_START:
    case GET_USERS_START:
    case GET_BOMS_START:
    case GET_FACTORIES_START:
    case GET_QUALITY_POINT_DETAILS_START:
    case SEARCH_QUALITY_POINTS_START:
    case GET_ITEM_QUALITY_POINT_START:
    case GET_SALE_ORDERS_START:
    case GET_QUALITY_POINTS_START:
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
    case GET_FACTORIES_BY_COMPANY_SUCCESS:
      return {
        ...state,
        factoryByCompanyList: action.payload,
        isLoading: false,
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
    case GET_WAREHOUSES_BY_FACTORIES_SUCCESS:
      return {
        ...state,
        warehouseByFactoryList: action.payload,
        isLoading: false,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        isLoading: false,
      }

    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        productList: [],
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
    case GET_ITEM_GROUPS_SUCCESS:
      return {
        ...state,
        itemGroupList: action.payload,
        isLoading: false,
      }

    case GET_ITEM_GROUPS_FAILED:
      return {
        ...state,
        itemGroupList: [],
        isLoading: false,
      }
    case GET_ITEM_TYPES_SUCCESS:
      return {
        ...state,
        itemTypeList: action.payload,
        isLoading: false,
      }

    case GET_ITEM_TYPES_FAILED:
      return {
        ...state,
        itemTypeList: [],
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

    case GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendorList: action.payload,
        isLoading: false,
      }
    case GET_VENDORS_FAILED:
      return {
        ...state,
        vendorList: [],
        isLoading: false,
      }

    case GET_ALL_ITEM_DETAILS_SUCCESS:
      return {
        ...state,
        itemDetailList: action.payload,
        isLoading: false,
      }

    case GET_ALL_ITEM_DETAILS_FAILED:
      return {
        ...state,
        itemDetailList: [],
        isLoading: false,
      }

    case GET_PRODUCING_STEPS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      }

    case GET_ROUTINGS_SUCCESS:
      return {
        ...state,
        routingList: action.payload,
        isLoading: false,
      }
    case GET_ROUTINGS_FAILED:
      return {
        ...state,
        routingList: [],
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
    case GET_SALE_ORDERS_SUCCESS:
      return {
        ...state,
        soList: action.payload,
        isLoading: false,
      }
    case GET_SALE_ORDERS_FAILED:
      return {
        ...state,
        soList: [],
        isLoading: false,
      }
    case GET_QUALITY_POINTS_SUCCESS:
      return {
        ...state,
        qualityPointList: action.payload,
        isLoading: false,
      }
    case GET_QUALITY_POINTS_FAILED:
      return {
        ...state,
        qualityPointList: [],
        isLoading: false,
      }
    case GET_COMPANIES_FAILED:
    case GET_FACTORIES_BY_COMPANY_FAILED:
    case GET_DEPARTMENTS_FAILED:
    case GET_ROLES_FAILED:
    case GET_WAREHOUSES_BY_FACTORIES_FAILED:
    case GET_PRODUCING_STEPS_FAILED:
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
    case GET_QUALITY_POINT_DETAILS_SUCCESS:
      return {
        ...state,
        qcDetails: action?.payload,
        isLoading: false,
      }
    case GET_QUALITY_POINT_DETAILS_FAILED:
      return {
        ...state,
        qcDetails: {},
        isLoading: false,
      }
    case GET_ITEM_QUALITY_POINT_SUCCESS:
      return {
        ...state,
        itemQualityPoint: action?.payload?.items,
        isLoading: false,
      }
    case GET_ITEM_QUALITY_POINT_FAILED:
      return {
        ...state,
        itemQualityPoint: [],
        isLoading: false,
      }
    case CREATE_PURCHASED_ORDER_START:
    case CREATE_PURCHASED_ORDER_SUCCESS:
    case CREATE_PURCHASED_ORDER_FAILED:
    default:
      return state
  }
}

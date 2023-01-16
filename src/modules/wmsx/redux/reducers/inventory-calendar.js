import {
  CONFIRM_INVENTORY_CALENDAR_FAILED,
  CONFIRM_INVENTORY_CALENDAR_START,
  CONFIRM_INVENTORY_CALENDAR_SUCCESS,
  CREATE_INVENTORY_CALENDAR_FAILED,
  CREATE_INVENTORY_CALENDAR_START,
  CREATE_INVENTORY_CALENDAR_SUCCESS,
  DELETE_INVENTORY_CALENDAR_FAILED,
  DELETE_INVENTORY_CALENDAR_START,
  DELETE_INVENTORY_CALENDAR_SUCCESS,
  GET_INVENTORY_CALENDAR_DETAILS_FAILED,
  GET_INVENTORY_CALENDAR_DETAILS_START,
  GET_INVENTORY_CALENDAR_DETAILS_SUCCESS,
  REJECT_INVENTORY_CALENDAR_FAILED,
  REJECT_INVENTORY_CALENDAR_START,
  REJECT_INVENTORY_CALENDAR_SUCCESS,
  SEARCH_INVENTORY_CALENDARS_FAILED,
  SEARCH_INVENTORY_CALENDARS_START,
  SEARCH_INVENTORY_CALENDARS_SUCCESS,
  UPDATE_INVENTORY_CALENDAR_FAILED,
  UPDATE_INVENTORY_CALENDAR_START,
  UPDATE_INVENTORY_CALENDAR_SUCCESS,
  RESET_INVENTORY_CALENDAR_DETAILS_STATE,
  GET_ITEM_START,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILED,
  GET_LIST_ITEM_DETAIL_RECIPT_START,
  GET_LIST_ITEM_DETAIL_RECIPT_SUCCESS,
  GET_LIST_ITEM_DETAIL_RECIPT_FAILED,
  APPROVE_INVENTORY_CALENDAR_FAILED,
  APPROVE_INVENTORY_CALENDAR_START,
  APPROVE_INVENTORY_CALENDAR_SUCCESS,
  CHECK_ITEM_NOT_EXECUTED_START,
  CHECK_ITEM_NOT_EXECUTED_SUCCESS,
  CHECK_ITEM_NOT_EXECUTED_FAILED,
} from '~/modules/wmsx/redux/actions/inventory-calendar'

const initialState = {
  isLoading: false,
  isLoadingItem: false,
  inventoryCalendarList: [],
  inventoryCalendarDetails: {},
  itemUpdate: [],
  itemListDetailRecipt: [],
  checkItemNotExecuted: [],
  total: null,
  totalItem: null,
  totalItemDetail: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function inventoryCalendar(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INVENTORY_CALENDARS_START:
    case CREATE_INVENTORY_CALENDAR_START:
    case UPDATE_INVENTORY_CALENDAR_START:
    case DELETE_INVENTORY_CALENDAR_START:
    case GET_INVENTORY_CALENDAR_DETAILS_START:
    case CONFIRM_INVENTORY_CALENDAR_START:
    case REJECT_INVENTORY_CALENDAR_START:
    case GET_ITEM_START:
    case APPROVE_INVENTORY_CALENDAR_START:
    case GET_LIST_ITEM_DETAIL_RECIPT_START:
    case CHECK_ITEM_NOT_EXECUTED_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_INVENTORY_CALENDARS_SUCCESS:
      return {
        ...state,
        inventoryCalendarList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case CHECK_ITEM_NOT_EXECUTED_SUCCESS:
      return {
        ...state,
        checkItemNotExecuted: action.payload.list,
        isLoading: false,
      }
    case SEARCH_INVENTORY_CALENDARS_FAILED:
      return {
        ...state,
        checkItemNotExecuted: [],
        isLoading: false,
      }
    case CHECK_ITEM_NOT_EXECUTED_FAILED:
      return {
        ...state,
        inventoryCalendarList: [],
        isLoading: false,
        total: 0,
      }
    case GET_LIST_ITEM_DETAIL_RECIPT_SUCCESS:
      return {
        ...state,
        itemListDetailRecipt: action.payload.list,
        isLoadingItem: false,
        isLoading: false,
        totalItem: action.payload.total,
      }
    case GET_LIST_ITEM_DETAIL_RECIPT_FAILED:
      return {
        ...state,
        itemListDetailRecipt: [],
        isLoadingItem: false,
        isLoading: false,
        totalItem: 0,
      }
    case APPROVE_INVENTORY_CALENDAR_FAILED:
    case CONFIRM_INVENTORY_CALENDAR_FAILED:
    case CONFIRM_INVENTORY_CALENDAR_SUCCESS:
    case APPROVE_INVENTORY_CALENDAR_SUCCESS:
    case REJECT_INVENTORY_CALENDAR_FAILED:
    case REJECT_INVENTORY_CALENDAR_SUCCESS:
    case CREATE_INVENTORY_CALENDAR_SUCCESS:
    case CREATE_INVENTORY_CALENDAR_FAILED:
    case UPDATE_INVENTORY_CALENDAR_SUCCESS:
    case UPDATE_INVENTORY_CALENDAR_FAILED:
    case DELETE_INVENTORY_CALENDAR_SUCCESS:
    case DELETE_INVENTORY_CALENDAR_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_INVENTORY_CALENDAR_DETAILS_SUCCESS:
      return {
        ...state,
        inventoryCalendarDetails: action.payload,
        isLoading: false,
      }
    case GET_INVENTORY_CALENDAR_DETAILS_FAILED:
      return {
        ...state,
        inventoryCalendarDetails: {},
        isLoading: false,
      }
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        itemUpdate: action?.payload?.items,
        isLoading: false,
        totalItemDetail: action?.payload?.meta?.total,
      }
    case GET_ITEM_FAILED:
      return {
        ...state,
        itemUpdate: [],
        isLoading: false,
      }
    case RESET_INVENTORY_CALENDAR_DETAILS_STATE:
      return {
        ...state,
        inventoryCalendarDetails: {},
        itemUpdate: [],
      }
    default:
      return state
  }
}

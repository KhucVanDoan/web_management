import {
  CREATE_ITEM_GROUP_FAILED,
  CREATE_ITEM_GROUP_START,
  CREATE_ITEM_GROUP_SUCCESS,
  DELETE_ITEM_GROUP_FAILED,
  DELETE_ITEM_GROUP_START,
  DELETE_ITEM_GROUP_SUCCESS,
  GET_ITEM_GROUP_DETAILS_FAILED,
  GET_ITEM_GROUP_DETAILS_START,
  GET_ITEM_GROUP_DETAILS_SUCCESS,
  SEARCH_ITEM_GROUPS_FAILED,
  SEARCH_ITEM_GROUPS_START,
  SEARCH_ITEM_GROUPS_SUCCESS,
  UPDATE_ITEM_GROUP_FAILED,
  UPDATE_ITEM_GROUP_START,
  UPDATE_ITEM_GROUP_SUCCESS,
  RESET_ITEM_GROUP_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/item-group-setting'

const initialState = {
  isLoading: false,
  itemGroupList: [],
  itemGroupDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function itemGroupSetting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEM_GROUPS_START:
    case CREATE_ITEM_GROUP_START:
    case UPDATE_ITEM_GROUP_START:
    case DELETE_ITEM_GROUP_START:
    case GET_ITEM_GROUP_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ITEM_GROUPS_SUCCESS:
      return {
        ...state,
        itemGroupList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case DELETE_ITEM_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemGroupList: state.itemGroupList.filter(
          (item) => item?.id !== action.payload.id,
        ),
      }
    case SEARCH_ITEM_GROUPS_FAILED:
    case CREATE_ITEM_GROUP_SUCCESS:
    case CREATE_ITEM_GROUP_FAILED:
    case UPDATE_ITEM_GROUP_SUCCESS:
    case UPDATE_ITEM_GROUP_FAILED:
    case DELETE_ITEM_GROUP_FAILED:
    case GET_ITEM_GROUP_DETAILS_FAILED:
      return {
        ...state,
        itemGroupDetails: {},
        isLoading: false,
      }
    case GET_ITEM_GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        itemGroupDetails: action.payload,
        isLoading: false,
      }

    case RESET_ITEM_GROUP_DETAILS_STATE:
      return {
        ...state,
        itemGroupDetails: {},
      }
    default:
      return state
  }
}

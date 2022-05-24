import {
  SEARCH_TEMPLATE_SHELFS_FAILED,
  SEARCH_TEMPLATE_SHELFS_START,
  SEARCH_TEMPLATE_SHELFS_SUCCESS,
  GET_TEMPLATE_SHELF_DETAIL_FAILED,
  GET_TEMPLATE_SHELF_DETAIL_START,
  GET_TEMPLATE_SHELF_DETAIL_SUCCESS,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
const initialState = {
  isLoading: false,
  templateShelfList: [],
  templateShelfDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineTemplateShelf(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE_SHELFS_START:
    case GET_TEMPLATE_SHELF_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_TEMPLATE_SHELFS_SUCCESS:
      return {
        ...state,
        templateShelfList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_TEMPLATE_SHELFS_FAILED:
      return {
        ...state,
        templateShelfList: [],
        isLoading: false,
        total: 0,
      }
    case GET_TEMPLATE_SHELF_DETAIL_SUCCESS:
      return {
        ...state,
        templateShelfDetails: action.payload,
        isLoading: false,
      }

    case GET_TEMPLATE_SHELF_DETAIL_FAILED:
      return {
        ...state,
        templateShelfDetails: {},
        isLoading: false,
      }

    default:
      return state
  }
}

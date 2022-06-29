import {
  CREATE_PACKAGE_FAILED,
  CREATE_PACKAGE_START,
  CREATE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAILED,
  DELETE_PACKAGE_START,
  DELETE_PACKAGE_SUCCESS,
  GET_PACKAGE_DETAILS_FAILED,
  GET_PACKAGE_DETAILS_START,
  GET_PACKAGE_DETAILS_SUCCESS,
  SEARCH_PACKAGES_FAILED,
  SEARCH_PACKAGES_START,
  SEARCH_PACKAGES_SUCCESS,
  UPDATE_PACKAGE_FAILED,
  UPDATE_PACKAGE_START,
  UPDATE_PACKAGE_SUCCESS,
  GET_PACKAGES_EVEN_BY_ITEM_FAILED,
  GET_PACKAGES_EVEN_BY_ITEM_SUCCESS,
  GET_PACKAGES_EVEN_BY_ITEM_START,
  RESET_PACKAGE_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-package'

const initialState = {
  isLoading: false,
  packageList: [],
  packageDetails: {},
  packagesEvenByItem: [],
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function definePackage(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGES_EVEN_BY_ITEM_START:
    case SEARCH_PACKAGES_START:
    case CREATE_PACKAGE_START:
    case UPDATE_PACKAGE_START:
    case DELETE_PACKAGE_START:
    case GET_PACKAGE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PACKAGES_SUCCESS:
      return {
        ...state,
        packageList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_PACKAGES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PACKAGES_EVEN_BY_ITEM_SUCCESS:
      return {
        ...state,
        packagesEvenByItem: action.payload.list,
        isLoading: false,
      }

    case GET_PACKAGES_EVEN_BY_ITEM_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_PACKAGE_SUCCESS:
    case CREATE_PACKAGE_FAILED:
    case UPDATE_PACKAGE_SUCCESS:
    case UPDATE_PACKAGE_FAILED:
    case DELETE_PACKAGE_SUCCESS:
    case DELETE_PACKAGE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PACKAGE_DETAILS_SUCCESS:
      return {
        ...state,
        packageDetails: action.payload,
        isLoading: false,
      }
    case GET_PACKAGE_DETAILS_FAILED:
      return {
        ...state,
        packageDetails: {},
        isLoading: false,
      }
    case RESET_PACKAGE_DETAILS_STATE:
      return {
        ...state,
        packageDetails: {},
      }
    default:
      return state
  }
}

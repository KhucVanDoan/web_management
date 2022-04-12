import {
  GET_APP_STORE_FAILED,
  GET_APP_STORE_START,
  GET_APP_STORE_SUCCESS,
} from '../actions/app-store'

const initialState = {
  itemTypes: [],
  itemGroups: [],
  itemUnits: [],
  warehouseTypes: [],
  companies: [],
  factories: [],
  roles: [],
  deparments: [],
  isLoading: true,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function appStore(state = initialState, action) {
  switch (action.type) {
    case GET_APP_STORE_START:
    case GET_APP_STORE_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case GET_APP_STORE_SUCCESS:
      return {
        ...action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

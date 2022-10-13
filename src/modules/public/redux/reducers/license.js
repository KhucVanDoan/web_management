import {
  ACTIVE_LICENSE_FAILED,
  ACTIVE_LICENSE_START,
  ACTIVE_LICENSE_SUCCESS,
} from '~/modules/public/redux/actions/license'

const initialState = {
  isLoading: false,
  license: null,
}

export default function license(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_LICENSE_START:
      return {
        ...state,
        isLoading: true,
      }
    case ACTIVE_LICENSE_SUCCESS:
      return {
        ...state,
        license: action.payload,
        isLoading: false,
      }
    case ACTIVE_LICENSE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

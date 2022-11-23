import {
  DETAIL_LICENSE_FAILED,
  DETAIL_LICENSE_START,
  DETAIL_LICENSE_SUCCESS,
} from '~/modules/wmsx/redux/actions/license'

const initialState = {
  isLoading: false,
  license: [],
}

export default function license(state = initialState, action) {
  switch (action.type) {
    case DETAIL_LICENSE_START:
      return {
        ...state,
        isLoading: true,
      }
    case DETAIL_LICENSE_SUCCESS:
      return {
        ...state,
        license: [action.payload],
        isLoading: false,
      }
    case DETAIL_LICENSE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

import {
  SEARCH_MAINTAIN_REQUEST_START,
  SEARCH_MAINTAIN_REQUEST_SUCCESS,
  SEARCH_MAINTAIN_REQUEST_FAIL,
  GET_MAINTAIN_REQUEST_START,
  GET_MAINTAIN_REQUEST_SUCCESS,
  GET_MAINTAIN_REQUEST_FAIL,
  GET_MAINTAIN_REQUEST_DETAIL_START,
  GET_MAINTAIN_REQUEST_DETAIL_SUCCESS,
  GET_MAINTAIN_REQUEST_DETAIL_FAIL,
  CONFIRM_MAINTAIN_REQUEST_START,
  CONFIRM_MAINTAIN_REQUEST_SUCCESS,
  CONFIRM_MAINTAIN_REQUEST_FAIL,
  REJECT_MAINTAIN_REQUEST_START,
  REJECT_MAINTAIN_REQUEST_FAIL,
  REJECT_MAINTAIN_REQUEST_SUCCESS,
  RESET_MAINTAIN_REQUEST,
} from '~/modules/mmsx/redux/actions/maintain-request'

const initialState = {
  isLoading: false,
  maintainRequestList: [],
  maintainRequestDetail: {},
  meta: {},
}

export default function maintainRequest(state = initialState, action) {
  switch (action.type) {
    case GET_MAINTAIN_REQUEST_START:
    case CONFIRM_MAINTAIN_REQUEST_START:
    case REJECT_MAINTAIN_REQUEST_START:
    case SEARCH_MAINTAIN_REQUEST_START:
    case GET_MAINTAIN_REQUEST_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MAINTAIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintainRequestList: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case SEARCH_MAINTAIN_REQUEST_SUCCESS:
      return {
        ...state,
        maintainRequestList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case GET_MAINTAIN_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        maintainRequestDetail: action?.payload,
        isLoading: false,
      }
    case GET_MAINTAIN_REQUEST_FAIL:
    case REJECT_MAINTAIN_REQUEST_FAIL:
    case CONFIRM_MAINTAIN_REQUEST_SUCCESS:
    case REJECT_MAINTAIN_REQUEST_SUCCESS:
    case GET_MAINTAIN_REQUEST_DETAIL_FAIL:
    case SEARCH_MAINTAIN_REQUEST_FAIL:
    case CONFIRM_MAINTAIN_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_MAINTAIN_REQUEST:
      return {
        ...state,
        maintainRequestDetail: {},
      }
    default:
      return state
  }
}

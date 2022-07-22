import {
  SEARCH_MAINTAINANCE_PROGRESS,
  SEARCH_MAINTAINANCE_PROGRESS_FAIL,
  SEARCH_MAINTAINANCE_PROGRESS_SUCCESS,
  GET_DETAIL_MAINTAINANCE_PROGRESS_FAIL,
  GET_DETAIL_MAINTAINANCE_PROGRESS_START,
  GET_DETAIL_MAINTAINANCE_PROGRESS_SUCCESS,
  RESET_MAINTAINANCE_PROGRESS,
} from '~/modules/mmsx/redux/actions/maintainance-progress'

const initialState = {
  isLoading: false,
  progressReport: [],
  progressDetail: {},
  meta: null,
}

export default function maintainanceProgress(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_MAINTAINANCE_PROGRESS_START:
    case SEARCH_MAINTAINANCE_PROGRESS:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MAINTAINANCE_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReport: action?.payload?.items,
        total: action?.payload?.meta?.total,
      }
    case GET_DETAIL_MAINTAINANCE_PROGRESS_FAIL:
    case SEARCH_MAINTAINANCE_PROGRESS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_MAINTAINANCE_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressDetail: action.payload,
      }
    case RESET_MAINTAINANCE_PROGRESS:
      return {
        ...state,
        progressDetail: {},
      }
    default:
      return state
  }
}

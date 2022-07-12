import {
  SEARCH_MAINTAINANCE_PROGRESS,
  SEARCH_MAINTAINANCE_PROGRESS_FAIL,
  SEARCH_MAINTAINANCE_PROGRESS_SUCCESS,
} from '~/modules/mmsx/redux/actions/maintainance-progress'

const initialState = {
  isLoading: false,
  progressReport: [],
  meta: null,
}

export default function maintainanceProgress(state = initialState, action) {
  switch (action.type) {
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
    case SEARCH_MAINTAINANCE_PROGRESS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

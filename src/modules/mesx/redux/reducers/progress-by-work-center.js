import {
  SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START,
  SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_SUCCESS,
  SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_FAILED,
} from '~/modules/mesx/redux/actions/progress-by-work-center'

const initialState = {
  isLoading: false,
  progressByWorkCenterList: [],
  total: null,
}

export default function progressByWorkCenter(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_SUCCESS:
      return {
        ...state,
        progressByWorkCenterList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_FAILED:
      return {
        ...state,
        progressByWorkCenterList: [],
        isLoading: false,
        total: 0,
      }
    default:
      return state
  }
}

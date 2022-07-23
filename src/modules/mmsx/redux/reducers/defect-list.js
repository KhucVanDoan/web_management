import {
  MMSX_CREATE_DEFECT_FAIL,
  MMSX_CREATE_DEFECT_START,
  MMSX_CREATE_DEFECT_SUCCESS,
  MMSX_DELETE_DEFECT_FAIL,
  MMSX_DELETE_DEFECT_START,
  MMSX_DELETE_DEFECT_SUCCESS,
  MMSX_GET_DEFECT_FAIL,
  MMSX_GET_DEFECT_START,
  MMSX_GET_DEFECT_SUCCESS,
  MMSX_RESET_DEFECT_STATE,
  MMSX_SEARCH_DEFECT_LIST_FAIL,
  MMSX_SEARCH_DEFECT_LIST_START,
  MMSX_SEARCH_DEFECT_LIST_SUCCESS,
  MMSX_UPDATE_DEFECT_FAIL,
  MMSX_UPDATE_DEFECT_START,
  MMSX_UPDATE_DEFECT_SUCCESS,
} from '../actions/defect-list'

const initialState = {
  defectList: [],
  defectDetail: {},
  isLoading: false,
  total: null,
}

export default function defectList(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_DEFECT_LIST_START:
    case MMSX_GET_DEFECT_START:
    case MMSX_DELETE_DEFECT_START:
    case MMSX_CREATE_DEFECT_START:
    case MMSX_UPDATE_DEFECT_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_DEFECT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defectList: action?.payload?.items,
        total: action?.payload?.meta?.total,
      }
    case MMSX_GET_DEFECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defectDetail: action?.payload,
      }
    case MMSX_SEARCH_DEFECT_LIST_FAIL:
    case MMSX_GET_DEFECT_FAIL:
    case MMSX_CREATE_DEFECT_SUCCESS:
    case MMSX_CREATE_DEFECT_FAIL:
    case MMSX_UPDATE_DEFECT_SUCCESS:
    case MMSX_UPDATE_DEFECT_FAIL:
    case MMSX_DELETE_DEFECT_SUCCESS:
    case MMSX_DELETE_DEFECT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_DEFECT_STATE:
      return {
        ...state,
        defectDetail: {},
      }
    default:
      return state
  }
}

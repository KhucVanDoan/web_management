import {
  MMSX_GET_DEFINE_UNIT_FAIL,
  MMSX_GET_DEFINE_UNIT_START,
  MMSX_GET_DEFINE_UNIT_SUCCESS,
  MMSX_GET_DEFINE_UNIT_LIST_FAIL,
  MMSX_GET_DEFINE_UNIT_LIST_START,
  MMSX_GET_DEFINE_UNIT_LIST_SUCCESS,
  MMSX_RESET_STATE_UNIT,
} from '../actions/defineUnit'

const initialState = {
  unitList: [],
  unitDetail: {},
  isLoading: false,
  total: null,
}

export default function defineUnit(state = initialState, action) {
  switch (action.type) {
    case MMSX_GET_DEFINE_UNIT_LIST_START:
    case MMSX_GET_DEFINE_UNIT_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_GET_DEFINE_UNIT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        unitList: action.payload.result,
        total: action?.payload?.meta?.total,
      }
    case MMSX_GET_DEFINE_UNIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        unitDetail: action.payload,
      }
    case MMSX_GET_DEFINE_UNIT_LIST_FAIL:
    case MMSX_GET_DEFINE_UNIT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_STATE_UNIT:
      return {
        ...state,
        unitDetail: {},
      }
    default:
      return state
  }
}

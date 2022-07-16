import {
  MMSX_GET_ATTRIBUTE_TYPE_FAIL,
  MMSX_GET_ATTRIBUTE_TYPE_START,
  MMSX_GET_ATTRIBUTE_TYPE_SUCCESS,
  MMSX_GET_ATTRIBUTE_TYPE_LIST_FAIL,
  MMSX_GET_ATTRIBUTE_TYPE_LIST_START,
  MMSX_GET_ATTRIBUTE_TYPE_LIST_SUCCESS,
  MMSX_RESET_STATE_ATTRIBUTE_TYPE,
} from '../actions/attribute-type'

const initialState = {
  attributeTypeList: [],
  attributeTypeDetail: {},
  isLoading: false,
  total: null,
}

export default function attributeType(state = initialState, action) {
  switch (action.type) {
    case MMSX_GET_ATTRIBUTE_TYPE_LIST_START:
    case MMSX_GET_ATTRIBUTE_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_GET_ATTRIBUTE_TYPE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attributeTypeList: action.payload.result,
        total: action?.payload?.meta?.total,
      }
    case MMSX_GET_ATTRIBUTE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attributeTypeDetail: action.payload,
      }
    case MMSX_GET_ATTRIBUTE_TYPE_LIST_FAIL:
    case MMSX_GET_ATTRIBUTE_TYPE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_STATE_ATTRIBUTE_TYPE:
      return {
        ...state,
        attributeTypeDetail: {},
      }
    default:
      return state
  }
}

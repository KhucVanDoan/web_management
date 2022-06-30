import {
  GET_DETAIL_TEMPLATE_INSTALL_FAIL,
  GET_DETAIL_TEMPLATE_INSTALL_START,
  GET_DETAIL_TEMPLATE_INSTALL_SUCCESS,
  GET_LIST_TEMPLATE_INSTALL_FAIL,
  GET_LIST_TEMPLATE_INSTALL_START,
  GET_LIST_TEMPLATE_INSTALL_SUCCESS,
  CREATE_TEMPLATE_INSTALL_FAIL,
  CREATE_TEMPLATE_INSTALL_START,
  CREATE_TEMPLATE_INSTALL_SUCCESS,
  DELETE_TEMPLATE_INSTALL_FAIL,
  DELETE_TEMPLATE_INSTALL_START,
  DELETE_TEMPLATE_INSTALL_SUCCESS,
  RESET_STATE_TEMPLATE_INSTALL,
} from '../actions/define-installation-template'

const initialState = {
  installList: [],
  installDetail: {},
  total: {},
  isLoading: false,
}

export default function defineInstallTemplate(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TEMPLATE_INSTALL_START:
    case GET_DETAIL_TEMPLATE_INSTALL_START:
    case DELETE_TEMPLATE_INSTALL_START:
    case CREATE_TEMPLATE_INSTALL_START:
      return {
        isLoading: true,
        ...state,
      }
    case GET_LIST_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        installList: action?.payload?.result,
        total: action?.payload?.meta?.total,
      }

    case GET_DETAIL_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        installDetail: action?.payload,
      }
    case GET_DETAIL_TEMPLATE_INSTALL_FAIL:
    case GET_LIST_TEMPLATE_INSTALL_FAIL:
    case DELETE_TEMPLATE_INSTALL_FAIL:
    case CREATE_TEMPLATE_INSTALL_FAIL:
    case DELETE_TEMPLATE_INSTALL_SUCCESS:
    case CREATE_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_TEMPLATE_INSTALL:
      return {
        ...state,
        installDetail: {},
      }
    default:
      return state
  }
}

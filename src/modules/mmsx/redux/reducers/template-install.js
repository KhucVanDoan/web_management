import {
  MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL,
  MMSX_GET_DETAIL_TEMPLATE_INSTALL_START,
  MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS,
  MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL,
  MMSX_GET_LIST_TEMPLATE_INSTALL_START,
  MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS,
  MMSX_CREATE_TEMPLATE_INSTALL_FAIL,
  MMSX_CREATE_TEMPLATE_INSTALL_START,
  MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS,
  MMSX_DELETE_TEMPLATE_INSTALL_FAIL,
  MMSX_DELETE_TEMPLATE_INSTALL_START,
  MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS,
} from '../actions/template-install'

const initialState = {
  installList: [],
  installDetail: {},
  meta: {},
  isLoading: false,
}

export default function templateInstall(state = initialState, action) {
  switch (action.type) {
    case MMSX_GET_LIST_TEMPLATE_INSTALL_START:
    case MMSX_GET_DETAIL_TEMPLATE_INSTALL_START:
    case MMSX_DELETE_TEMPLATE_INSTALL_START:
    case MMSX_CREATE_TEMPLATE_INSTALL_START:
      return {
        isLoading: true,
        ...state,
      }
    case MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        installList: action?.payload?.result,
        meta: action?.payload?.meta,
      }

    case MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        installDetail: action?.payload,
      }
    case MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL:
    case MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL:
    case MMSX_DELETE_TEMPLATE_INSTALL_FAIL:
    case MMSX_CREATE_TEMPLATE_INSTALL_FAIL:
    case MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS:
    case MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

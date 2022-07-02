export const MMSX_GET_LIST_TEMPLATE_INSTALL_START =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_START'
export const MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL'

export const MMSX_GET_DETAIL_TEMPLATE_INSTALL_START =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_START'
export const MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL'

export const MMSX_CREATE_TEMPLATE_INSTALL_START =
  'MMSX_CREATE_TEMPLATE_INSTALL_START'
export const MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_CREATE_TEMPLATE_INSTALL_FAIL =
  'MMSX_CREATE_TEMPLATE_INSTALL_FAIL'

export const MMSX_UPDATE_TEMPLATE_INSTALL_START =
  'MMSX_UPDATE_TEMPLATE_INSTALL_START'
export const MMSX_UPDATE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_UPDATE_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_UPDATE_TEMPLATE_INSTALL_FAIL =
  'MMSX_UPDATE_TEMPLATE_INSTALL_FAIL'

export const MMSX_DELETE_TEMPLATE_INSTALL_START =
  'MMSX_DELETE_TEMPLATE_INSTALL_START'
export const MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_DELETE_TEMPLATE_INSTALL_FAIL =
  'MMSX_DELETE_TEMPLATE_INSTALL_FAIL'

export function getListTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_LIST_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getListTemplateInstallSuccess(payload) {
  return {
    type: MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function getListTemplateInstallFail() {
  return {
    type: MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL,
  }
}

export function createTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createTemplateInstallSuccess(payload) {
  return {
    type: MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function createTemplateInstallFail() {
  return {
    type: MMSX_CREATE_TEMPLATE_INSTALL_FAIL,
  }
}

export function getDetailTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailTemplateInstallSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function getDetailTemplateInstallFail() {
  return {
    type: MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL,
  }
}

export function updateTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateTemplateInstallSuccess(payload) {
  return {
    type: MMSX_UPDATE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function updateTemplateInstallFail() {
  return {
    type: MMSX_UPDATE_TEMPLATE_INSTALL_FAIL,
  }
}

export function deleteTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteTemplateInstallSuccess(payload) {
  return {
    type: MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function deleteTemplateInstallFail() {
  return {
    type: MMSX_DELETE_TEMPLATE_INSTALL_FAIL,
  }
}
export default {
  updateTemplateInstall,
  updateTemplateInstallSuccess,
  updateTemplateInstallFail,
  getListTemplateInstall,
  getListTemplateInstallSuccess,
  getListTemplateInstallFail,
  createTemplateInstall,
  createTemplateInstallFail,
  createTemplateInstallSuccess,
  deleteTemplateInstall,
  deleteTemplateInstallFail,
  deleteTemplateInstallSuccess,
  getDetailTemplateInstall,
  getDetailTemplateInstallFail,
  getDetailTemplateInstallSuccess,
}

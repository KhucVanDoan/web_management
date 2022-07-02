export const MMSX_GET_ATTRIBUTE_TYPE_LIST_START =
  'MMSX_GET_ATTRIBUTE_TYPE_LIST_START'
export const MMSX_GET_ATTRIBUTE_TYPE_LIST_SUCCESS =
  'MMSX_GET_ATTRIBUTE_TYPE_LIST_SUCCESS'
export const MMSX_GET_ATTRIBUTE_TYPE_LIST_FAIL =
  'MMSX_GET_ATTRIBUTE_TYPE_LIST_FAIL'

export const MMSX_CREATE_ATTRIBUTE_TYPE_START =
  'MMSX_CREATE_ATTRIBUTE_TYPE_START'
export const MMSX_CREATE_ATTRIBUTE_TYPE_SUCCESS =
  'MMSX_CREATE_ATTRIBUTE_TYPE_SUCCESS'
export const MMSX_CREATE_ATTRIBUTE_TYPE_FAIL = 'MMSX_CREATE_ATTRIBUTE_TYPE_FAIL'

export const MMSX_GET_ATTRIBUTE_TYPE_START = 'MMSX_GET_ATTRIBUTE_TYPE_START'
export const MMSX_GET_ATTRIBUTE_TYPE_SUCCESS = 'MMSX_GET_ATTRIBUTE_TYPE_SUCCESS'
export const MMSX_GET_ATTRIBUTE_TYPE_FAIL = 'MMSX_GET_ATTRIBUTE_TYPE_FAIL'

export const MMSX_UPDATE_ATTRIBUTE_TYPE_START =
  'MMSX_UPDATE_ATTRIBUTE_TYPE_START'
export const MMSX_UPDATE_ATTRIBUTE_TYPE_SUCCESS =
  'MMSX_UPDATE_ATTRIBUTE_TYPE_SUCCESS'
export const MMSX_UPDATE_ATTRIBUTE_TYPE_FAIL = 'MMSX_UPDATE_ATTRIBUTE_TYPE_FAIL'

export const MMSX_DELETE_ATTRIBUTE_TYPE_START =
  'MMSX_DELETE_ATTRIBUTE_TYPE_START'
export const MMSX_DELETE_ATTRIBUTE_TYPE_SUCCESS =
  'MMSX_DELETE_ATTRIBUTE_TYPE_SUCCESS'
export const MMSX_DELETE_ATTRIBUTE_TYPE_FAIL = 'MMSX_DELETE_ATTRIBUTE_TYPE_FAIL'

export const MMSX_VALIDATE_ATTRIBUTE_TYPE = 'MMSX_VALIDATE_ATTRIBUTE_TYPE'
export const MMSX_VALIDATE_ATTRIBUTE_TYPE_SUCCESS =
  'MMSX_VALIDATE_ATTRIBUTE_TYPE_SUCCESS'
export const MMSX_VALIDATE_ATTRIBUTE_TYPE_FAIL =
  'MMSX_VALIDATE_ATTRIBUTE_TYPE_FAIL'

export function getAttributeTypeList(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getAttributeTypeListSuccess(payload) {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_LIST_SUCCESS,
    payload,
  }
}

export function getAttributeTypeListFail() {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_LIST_FAIL,
  }
}

export function createAttributeType(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_ATTRIBUTE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createAttributeTypeSuccess(payload) {
  return {
    type: MMSX_CREATE_ATTRIBUTE_TYPE_SUCCESS,
    payload,
  }
}

export function createAttributeTypeFail() {
  return {
    type: MMSX_CREATE_ATTRIBUTE_TYPE_FAIL,
  }
}

export function getAttributeType(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getAttributeTypeSuccess(payload) {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_SUCCESS,
    payload,
  }
}

export function getAttributeTypeFail() {
  return {
    type: MMSX_GET_ATTRIBUTE_TYPE_FAIL,
  }
}

export function updateAttributeType(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateAttributeTypeSuccess(payload) {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_TYPE_SUCCESS,
    payload,
  }
}

export function updateAttributeTypeFail() {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_TYPE_FAIL,
  }
}

export function deleteAttributeType(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_ATTRIBUTE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteAttributeTypeSuccess(payload) {
  return {
    type: MMSX_DELETE_ATTRIBUTE_TYPE_SUCCESS,
    payload,
  }
}

export function deleteAttributeTypeFail() {
  return {
    type: MMSX_DELETE_ATTRIBUTE_TYPE_FAIL,
  }
}

export function validateAttributeTypeCode(payload, onSuccess, onError) {
  return {
    type: MMSX_VALIDATE_ATTRIBUTE_TYPE,
    payload,
    onSuccess,
    onError,
  }
}

export function validateAttributeTypeCodeSuccess(payload) {
  return {
    type: MMSX_VALIDATE_ATTRIBUTE_TYPE_SUCCESS,
    payload,
  }
}

export function validateAttributeTypeCodeFail() {
  return {
    type: MMSX_VALIDATE_ATTRIBUTE_TYPE_FAIL,
  }
}

export default {
  getAttributeTypeList,
  getAttributeTypeListSuccess,
  getAttributeTypeListFail,
  createAttributeType,
  createAttributeTypeSuccess,
  createAttributeTypeFail,
  getAttributeType,
  getAttributeTypeSuccess,
  getAttributeTypeFail,
  updateAttributeType,
  updateAttributeTypeSuccess,
  updateAttributeTypeFail,
  deleteAttributeType,
  deleteAttributeTypeSuccess,
  deleteAttributeTypeFail,
  validateAttributeTypeCode,
  validateAttributeTypeCodeSuccess,
  validateAttributeTypeCodeFail,
}

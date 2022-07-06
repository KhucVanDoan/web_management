export const SEARCH_TEMPLATE_CHECKLIST_START =
  'MMSX_SEARCH_TEMPLATE_CHECKLIST_START'
export const SEARCH_TEMPLATE_CHECKLIST_SUCCESS =
  'MMSX_SEARCH_TEMPLATE_CHECKLIST_SUCCESS'
export const SEARCH_TEMPLATE_CHECKLIST_FAIL =
  'MMSX_SEARCH_TEMPLATE_CHECKLIST_FAIL'

export const GET_TEMPLATE_CHECKLIST_START = 'MMSX_GET_TEMPLATE_CHECKLIST_START'
export const GET_TEMPLATE_CHECKLIST_SUCCESS =
  'MMSX_GET_TEMPLATE_CHECKLIST_SUCCESS'
export const GET_TEMPLATE_CHECKLIST_FAIL = 'MMSX_GET_TEMPLATE_CHECKLIST_FAIL'

export const CREATE_TEMPLATE_CHECKLIST_START =
  'MMSX_CREATE_TEMPLATE_CHECKLIST_START'
export const CREATE_TEMPLATE_CHECKLIST_SUCCESS =
  'MMSX_CREATE_TEMPLATE_CHECKLIST_SUCCESS'
export const CREATE_TEMPLATE_CHECKLIST_FAIL =
  'MMSX_CREATE_TEMPLATE_CHECKLIST_FAIL'

export const UPDATE_TEMPLATE_CHECKLIST_START =
  'MMSX_UPDATE_TEMPLATE_CHECKLIST_START'
export const UPDATE_TEMPLATE_CHECKLIST_SUCCESS =
  'MMSX_UPDATE_TEMPLATE_CHECKLIST_SUCCESS'
export const UPDATE_TEMPLATE_CHECKLIST_FAIL =
  'MMSX_UPDATE_TEMPLATE_CHECKLIST_FAIL'

export const DELETE_TEMPLATE_CHECKLIST_START =
  'MMSX_DELETE_TEMPLATE_CHECKLIST_START'
export const DELETE_TEMPLATE_CHECKLIST_SUCCESS =
  'MMSX_DELETE_TEMPLATE_CHECKLIST_SUCCESS'
export const DELETE_TEMPLATE_CHECKLIST_FAIL =
  'MMSX_DELETE_TEMPLATE_CHECKLIST_FAIL'

export const RESET_TEMPLATE_CHECKLIST = 'MMSX_RESET_TEMPLATE_CHECKLIST'

export function searchTemplateChecklist(payload, onSuccess, onError) {
  return {
    type: SEARCH_TEMPLATE_CHECKLIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchTemplateChecklistSuccess(payload) {
  return {
    type: SEARCH_TEMPLATE_CHECKLIST_SUCCESS,
    payload,
  }
}

export function searchTemplateChecklistFail() {
  return {
    type: SEARCH_TEMPLATE_CHECKLIST_FAIL,
  }
}

export function createTemplateChecklist(payload, onSuccess, onError) {
  return {
    type: CREATE_TEMPLATE_CHECKLIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createTemplateChecklistSuccess(payload) {
  return {
    type: CREATE_TEMPLATE_CHECKLIST_SUCCESS,
    payload,
  }
}

export function createTemplateChecklistFail() {
  return {
    type: CREATE_TEMPLATE_CHECKLIST_FAIL,
  }
}

export function getTemplateCheckList(payload, onSuccess, onError) {
  return {
    type: GET_TEMPLATE_CHECKLIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getTemplateCheckListSuccess(payload) {
  return {
    type: GET_TEMPLATE_CHECKLIST_SUCCESS,
    payload,
  }
}

export function getTemplateChecklistFail() {
  return {
    type: GET_TEMPLATE_CHECKLIST_FAIL,
  }
}

export function updateTemplateChecklist(payload, onSuccess, onError) {
  return {
    type: UPDATE_TEMPLATE_CHECKLIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateTemplateChecklistSuccess(payload) {
  return {
    type: UPDATE_TEMPLATE_CHECKLIST_SUCCESS,
    payload,
  }
}

export function updateTemplateChecklistFail() {
  return {
    type: UPDATE_TEMPLATE_CHECKLIST_FAIL,
  }
}

export function deleteTemplateChecklist(payload, onSuccess, onError) {
  return {
    type: DELETE_TEMPLATE_CHECKLIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteTemplateChecklistSuccess(payload) {
  return {
    type: DELETE_TEMPLATE_CHECKLIST_SUCCESS,
    payload,
  }
}

export function deleteTemplateChecklistFail() {
  return {
    type: DELETE_TEMPLATE_CHECKLIST_FAIL,
  }
}

export function resetTemplateChecklist() {
  return {
    type: RESET_TEMPLATE_CHECKLIST,
  }
}

export default {
  searchTemplateChecklist,
  searchTemplateChecklistSuccess,
  searchTemplateChecklistFail,
  createTemplateChecklist,
  createTemplateChecklistSuccess,
  createTemplateChecklistFail,
  getTemplateCheckList,
  getTemplateCheckListSuccess,
  getTemplateChecklistFail,
  updateTemplateChecklist,
  updateTemplateChecklistSuccess,
  updateTemplateChecklistFail,
  deleteTemplateChecklist,
  deleteTemplateChecklistSuccess,
  deleteTemplateChecklistFail,
  resetTemplateChecklist,
}

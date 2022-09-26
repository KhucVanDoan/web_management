export const SEARCH_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_PROPOSAL_START'
export const SEARCH_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const SEARCH_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const CREATE_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_CREATE_WAREHOUSE_EXPORT_PROPOSAL_START'
export const CREATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const CREATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_CREATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_START'
export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const DELETE_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_DELETE_WAREHOUSE_EXPORT_PROPOSAL_START'
export const DELETE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const DELETE_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_DELETE_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_START =
  'WMSX_GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_START'
export const GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_SUCCESS'
export const GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_START'
export const CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const REJECT_WAREHOUSE_EXPORT_PROPOSAL_START =
  'WMSX_REJECT_WAREHOUSE_EXPORT_PROPOSAL_START'
export const REJECT_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS =
  'WMSX_REJECT_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS'
export const REJECT_WAREHOUSE_EXPORT_PROPOSAL_FAILED =
  'WMSX_REJECT_WAREHOUSE_EXPORT_PROPOSAL_FAILED'

export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_START =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_START'
export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_SUCCESS'
export const UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_FAILED =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_FAILED'

export const REQUEST_ITEM_CODE_START = 'WMSX_REQUEST_ITEM_CODE_START'
export const REQUEST_ITEM_CODE_SUCCESS = 'WMSX_REQUEST_ITEM_CODE_SUCCESS'
export const REQUEST_ITEM_CODE_FAILED = 'WMSX_REQUEST_ITEM_CODE_FAILED'

export const RESET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_STATE =
  'WMSX_RESET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_STATE'

export function searchWarehouseExportProposal(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchWarehouseExportProposalSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseExportProposalFailed() {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function createWarehouseExportProposal(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createWarehouseExportProposalSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseExportProposalFailed() {
  return {
    type: CREATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function updateWarehouseExportProposal(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseExportProposalSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseExportProposalFailed() {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function updateWarehouseExportProposalQuantity(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseExportProposalQuantitySuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseExportProposalQuantityFailed() {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_PROPOSAL_QUANTITY_FAILED,
  }
}
export function deleteWarehouseExportProposal(packageId, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteWarehouseExportProposalSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function deleteWarehouseExportProposalFailed() {
  return {
    type: DELETE_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function getWarehouseExportProposaltDetailsById(
  packageId,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseExportProposaltDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getWarehouseExportProposaltDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_FAILED,
  }
}

export function confirmWarehouseExportProposalById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmWarehouseExportProposalByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseExportProposalByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function rejectWarehouseExportProposalById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_PROPOSAL_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectWarehouseExportProposalByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_PROPOSAL_SUCCESS,
    payload: payload,
  }
}

export function rejectWarehouseExportProposalByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_EXPORT_PROPOSAL_FAILED,
  }
}

export function requestItemCode(payload, onSuccess, onError) {
  return {
    type: REQUEST_ITEM_CODE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function requestItemCodeSuccess(payload) {
  return {
    type: REQUEST_ITEM_CODE_SUCCESS,
    payload: payload,
  }
}

export function requestItemCodeFailed() {
  return {
    type: REQUEST_ITEM_CODE_FAILED,
  }
}

export function resetWarehouseExportProposalState() {
  return {
    type: RESET_WAREHOUSE_EXPORT_PROPOSAL_DETAILS_STATE,
  }
}

export default {
  searchWarehouseExportProposal,
  searchWarehouseExportProposalSuccess,
  searchWarehouseExportProposalFailed,
  createWarehouseExportProposal,
  createWarehouseExportProposalSuccess,
  createWarehouseExportProposalFailed,
  updateWarehouseExportProposal,
  updateWarehouseExportProposalSuccess,
  updateWarehouseExportProposalFailed,
  deleteWarehouseExportProposal,
  deleteWarehouseExportProposalSuccess,
  deleteWarehouseExportProposalFailed,
  getWarehouseExportProposaltDetailsById,
  getWarehouseExportProposaltDetailsByIdSuccess,
  getWarehouseExportProposaltDetailsByIdFailed,
  confirmWarehouseExportProposalById,
  confirmWarehouseExportProposalByIdSuccess,
  confirmWarehouseExportProposalByIdFailed,
  rejectWarehouseExportProposalById,
  rejectWarehouseExportProposalByIdFailed,
  rejectWarehouseExportProposalByIdSuccess,
  resetWarehouseExportProposalState,
  updateWarehouseExportProposalQuantity,
  updateWarehouseExportProposalQuantitySuccess,
  updateWarehouseExportProposalQuantityFailed,
  requestItemCode,
  requestItemCodeSuccess,
  requestItemCodeFailed,
}

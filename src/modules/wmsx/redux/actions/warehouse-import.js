export const GET_WAREHOUSE_IMPORT_MOVEMENTS =
  'WMSX_GET_WAREHOUSE_IMPORT_MOVEMENTS'
export const GET_WAREHOUSE_IMPORT_MOVEMENTS_SUCCESS =
  'WMSX_WAREHOUSE_IMPORT_MOVEMENTS_SUCCESS'

export function getWarehouseImportMovements(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_IMPORT_MOVEMENTS,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseImportMovementsSuccess(payload) {
  return {
    type: GET_WAREHOUSE_IMPORT_MOVEMENTS_SUCCESS,
    payload: payload,
  }
}

export default {
  getWarehouseImportMovements,
  getWarehouseImportMovementsSuccess,
}

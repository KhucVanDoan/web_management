export const SEARCH_BLOCKS_START = 'WMSX_SEARCH_BLOCKS_START'
export const SEARCH_BLOCKS_SUCCESS = 'WMSX_SEARCH_BLOCKS_SUCCESS'
export const SEARCH_BLOCKS_FAILED = 'WMSX_SEARCH_BLOCKS_FAILED'

export const CREATE_BLOCK_START = 'WMSX_CREATE_BLOCK_START'
export const CREATE_BLOCK_SUCCESS = 'WMSX_CREATE_BLOCK_SUCCESS'
export const CREATE_BLOCK_FAILED = 'WMSX_CREATE_BLOCK_FAILED'

export const UPDATE_BLOCK_START = 'WMSX_UPDATE_BLOCK_START'
export const UPDATE_BLOCK_SUCCESS = 'WMSX_UPDATE_BLOCK_SUCCESS'
export const UPDATE_BLOCK_FAILED = 'WMSX_UPDATE_BLOCK_FAILED'

export const DELETE_BLOCK_START = 'WMSX_DELETE_BLOCK_START'
export const DELETE_BLOCK_SUCCESS = 'WMSX_DELETE_BLOCK_SUCCESS'
export const DELETE_BLOCK_FAILED = 'WMSX_DELETE_BLOCK_FAILED'

export const GET_BLOCK_DETAILS_START = 'WMSX_GET_BLOCK_DETAILS_START'
export const GET_BLOCK_DETAILS_SUCCESS = 'WMSX_GET_BLOCK_DETAILS_SUCCESS'
export const GET_BLOCK_DETAILS_FAILED = 'WMSX_GET_BLOCK_DETAILS_FAILED'

export const PRINT_QR_BLOCKS_START = 'WMSX_PRINT_QR_BLOCKS_START'
export const PRINT_QR_BLOCKS_SUCCESS = 'WMSX_PRINT_QR_BLOCKS_SUCCESS'
export const PRINT_QR_BLOCKS_FAILED = 'WMSX_PRINT_QR_BLOCKS_FAILED'

export const RESET_BLOCK_DETAILS_STATE = 'WMSX_RESET_BLOCK_DETAILS_STATE'
/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBlocks(payload, onSuccess, onError) {
  return {
    type: SEARCH_BLOCKS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search block success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBlocksSuccess(payload) {
  return {
    type: SEARCH_BLOCKS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search block failed action
 * @returns {object}
 */
export function searchBlocksFailed() {
  return {
    type: SEARCH_BLOCKS_FAILED,
  }
}

/**
 * Create block
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBlock(payload, onSuccess, onError) {
  return {
    type: CREATE_BLOCK_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create block success action
 * @param {*} payload
 * @returns {object}
 */
export function createBlockSuccess(payload) {
  return {
    type: CREATE_BLOCK_SUCCESS,
    payload: payload,
  }
}

/**
 * Create block failed action
 * @returns {object}
 */
export function createBlockFailed() {
  return {
    type: CREATE_BLOCK_FAILED,
  }
}

/**
 * Update block
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateBlock(payload, onSuccess, onError) {
  return {
    type: UPDATE_BLOCK_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update block success action
 * @param {*} payload
 * @returns {object}
 */
export function updateBlockSuccess(payload) {
  return {
    type: UPDATE_BLOCK_SUCCESS,
    payload: payload,
  }
}

/**
 * Update block failed action
 * @returns {object}
 */
export function updateBlockFailed() {
  return {
    type: UPDATE_BLOCK_FAILED,
  }
}
/**
 * Delete block
 * @param {int} blockId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBlock(blockId, onSuccess, onError) {
  return {
    type: DELETE_BLOCK_START,
    payload: blockId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete block success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBlockSuccess(payload) {
  return {
    type: DELETE_BLOCK_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete block failed action
 * @returns {object}
 */
export function deleteBlockFailed() {
  return {
    type: DELETE_BLOCK_FAILED,
  }
}

/**
 * Get block details
 * @param {int} blockId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBlockDetailsById(blockId, onSuccess, onError) {
  return {
    type: GET_BLOCK_DETAILS_START,
    payload: blockId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get block details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBlockDetailsByIdSuccess(payload) {
  return {
    type: GET_BLOCK_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get block details by id failed action
 * @returns {object}
 */
export function getBlockDetailsByIdFailed() {
  return {
    type: GET_BLOCK_DETAILS_FAILED,
  }
}

export function resetBlockDetailsState() {
  return {
    type: RESET_BLOCK_DETAILS_STATE,
  }
}

/**
 * Print QR blocks
 * @param {int} blockId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function printQRBlocks(blockId, onSuccess, onError) {
  return {
    type: PRINT_QR_BLOCKS_START,
    payload: blockId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Print QR blocks by id success action
 * @param {*} payload
 * @returns {object}
 */
export function printQRBlocksSuccess(payload) {
  return {
    type: PRINT_QR_BLOCKS_SUCCESS,
    payload: payload,
  }
}

/**
 * Print QR blocks by id failed action
 * @returns {object}
 */
export function printQRBlocksFailed() {
  return {
    type: PRINT_QR_BLOCKS_FAILED,
  }
}

export default {
  searchBlocks,
  searchBlocksSuccess,
  searchBlocksFailed,
  createBlock,
  createBlockSuccess,
  createBlockFailed,
  updateBlock,
  updateBlockSuccess,
  updateBlockFailed,
  deleteBlock,
  deleteBlockSuccess,
  deleteBlockFailed,
  getBlockDetailsById,
  getBlockDetailsByIdSuccess,
  getBlockDetailsByIdFailed,
  resetBlockDetailsState,
  printQRBlocks,
  printQRBlocksSuccess,
  printQRBlocksFailed,
}

export const SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START =
  'WMSX_SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START'
export const SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_SUCCESS =
  'WMSX_SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_SUCCESS'
export const SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_FAILED =
  'WMSX_SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_FAILED'

/**
 * Save template sector template shelf
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function saveTemplateSectorTemplateShelf(payload, onSuccess, onError) {
  return {
    type: SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Save template sector template shelf success action
 * @param {*} payload
 * @returns {object}
 */
export function saveTemplateSectorTemplateShelfSuccess(payload) {
  return {
    type: SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Save template sector template shelf failed action
 * @returns {object}
 */
export function saveTemplateSectorTemplateShelfFailed() {
  return {
    type: SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_FAILED,
  }
}
export default {
  saveTemplateSectorTemplateShelf,
  saveTemplateSectorTemplateShelfSuccess,
  saveTemplateSectorTemplateShelfFailed,
}

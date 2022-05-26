import {
  SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_FAILED,
  SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START,
  SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_SUCCESS,
} from '../actions/template-sector-template-shelf'

const initialState = {
  isLoading: false,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function templateSectorTemplateShelf(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START:
      return {
        ...state,
        isLoading: true,
      }
    case SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

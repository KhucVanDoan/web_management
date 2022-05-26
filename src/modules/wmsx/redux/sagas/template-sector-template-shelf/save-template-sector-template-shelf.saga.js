import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  saveTemplateSectorTemplateShelfFailed,
  saveTemplateSectorTemplateShelfSuccess,
  SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START,
} from '../../actions/template-sector-template-shelf'

/**
 * Save template sector template shelf API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const saveTemplateSectorTemplateShelfApi = (params) => {
  const uri = `/v1/warehouses/template-sector-template-shelf`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSaveTemplateSectorTemplateShelf(action) {
  try {
    const response = yield call(
      saveTemplateSectorTemplateShelfApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      yield put(saveTemplateSectorTemplateShelfSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(saveTemplateSectorTemplateShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch save template sector template shelf
 */
export default function* watchSaveTemplateSectorTemplateShelf() {
  yield takeLatest(
    SAVE_TEMPLATE_SECTOR_TEMPLATE_SHELF_START,
    doSaveTemplateSectorTemplateShelf,
  )
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteTemplateShelfFailed,
  deleteTemplateShelfSuccess,
  DELETE_TEMPLATE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Delete template shelf
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteTemplateShelfApi = (params) => {
  const uri = `/v1/warehouses/template-shelfs/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteTemplateShelf(action) {
  try {
    const response = yield call(deleteTemplateShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteTemplateShelfSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'templateShelf.deleteTemplateShelfSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteTemplateShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete template shelf
 */
export default function* watchDeleteTemplateShelf() {
  yield takeLatest(DELETE_TEMPLATE_SHELF_START, doDeleteTemplateShelf)
}

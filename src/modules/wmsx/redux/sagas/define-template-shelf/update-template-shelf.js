import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateTemplateShelfFailed,
  updateTemplateShelfSuccess,
  UPDATE_TEMPLATE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Update TemplateShelf API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateTemplateShelfApi = (params) => {
  const uri = `/v1/warehouses/template-shelfs/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateTemplateShelf(action) {
  try {
    const response = yield call(updateTemplateShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateTemplateShelfSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateTemplateShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateTemplateShelf() {
  yield takeLatest(UPDATE_TEMPLATE_SHELF_START, doUpdateTemplateShelf)
}

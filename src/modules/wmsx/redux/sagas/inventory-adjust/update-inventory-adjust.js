import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInventoryAdjustFailed,
  updateInventoryAdjustSuccess,
  UPDATE_INVENTORY_ADJUST_START,
} from '~/modules/wmsx/redux/actions/inventory-adjust'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update warehouse transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateInventoryAdjustApi = (params) => {
  const uri = `/v1/warehouses/inventory-adjustments/${params?.id}`
  const data = { ...params }
  delete data['id']
  let form_data = new FormData()
  for (let key in data?.attachments) {
    form_data.append('attachments', data?.attachments[key])
  }
  delete data['attachments']
  for (let key in data) {
    form_data.append(key, data[key])
  }
  return api.put(uri, form_data)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInventoryAdjust(action) {
  try {
    const response = yield call(updateInventoryAdjustApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInventoryAdjustSuccess(response.data))

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
    yield put(updateInventoryAdjustFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update warehouse transfer
 */
export default function* watchUpdateInventoryAdjust() {
  yield takeLatest(UPDATE_INVENTORY_ADJUST_START, doUpdateInventoryAdjust)
}

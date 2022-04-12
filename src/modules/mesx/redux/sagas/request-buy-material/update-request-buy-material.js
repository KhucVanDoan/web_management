import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateRequestBuyMaterialFailed,
  updateRequestBuyMaterialSuccess,
  UPDATE_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateRequestBuyMaterialApi = (params) => {
  const url = `v1/produces/material-request-warnings/${params.id}`
  return api.put(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateRequestBuyMaterial(action) {
  try {
    const response = yield call(updateRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateRequestBuyMaterialSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateRequestBuyMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchUpdateRequestBuyMaterial() {
  yield takeLatest(
    UPDATE_REQUEST_BUY_MATERIAL_START,
    doUpdateRequestBuyMaterial,
  )
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateTypeUnitFailed,
  updateTypeUnitSuccess,
  WMSX_UPDATE_TYPE_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateTypeUnitApi = (body) => {
  const uri = `/v1/warehouse-yard/rent-units/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateTypeUnit(action) {
  try {
    const response = yield call(updateTypeUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateTypeUnitSuccess(response.data))

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
    yield put(updateTypeUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateTypeUnit() {
  yield takeLatest(WMSX_UPDATE_TYPE_UNIT_START, doUpdateTypeUnit)
}

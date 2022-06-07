import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmTypeUnitByIdFailed,
  confirmTypeUnitByIdSuccess,
  WMSX_CONFIRM_TYPE_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Confirm purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmTypeUnitApi = (params) => {
  const uri = `/v1/warehouse-yard/rent-units/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmTypeUnit(action) {
  try {
    const response = yield call(confirmTypeUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmTypeUnitByIdSuccess(response.payload))

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
    yield put(confirmTypeUnitByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmTypeUnit() {
  yield takeLatest(WMSX_CONFIRM_TYPE_UNIT_START, doConfirmTypeUnit)
}

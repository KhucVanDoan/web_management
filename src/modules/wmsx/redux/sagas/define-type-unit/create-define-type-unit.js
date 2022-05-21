import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTypeUnitFailed,
  createTypeUnitSuccess,
  WMSX_CREATE_TYPE_UNIT_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createTypeUnitApi = (body) => {
  const uri = `/v1/warehouse-yard/rent-units/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateTypeUnit(action) {
  try {
    const response = yield call(createTypeUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createTypeUnitSuccess(response.data))

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
    yield put(createTypeUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateTypeUnit() {
  yield takeLatest(WMSX_CREATE_TYPE_UNIT_START, doCreateTypeUnit)
}

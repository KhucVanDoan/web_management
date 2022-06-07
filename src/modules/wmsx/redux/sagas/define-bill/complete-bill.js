import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  completeBillByIdFailed,
  completeBillByIdSuccess,
  WMSX_COMPLETE_BILL_START,
} from '../../actions/define-bill'

/**
 * Confirm bill
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const completeBillApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params}/complete`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCompleteBill(action) {
  try {
    const response = yield call(completeBillApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(completeBillByIdSuccess(response.payload))

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
    yield put(completeBillByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm bill
 */
export default function* watchCompleteBill() {
  yield takeLatest(WMSX_COMPLETE_BILL_START, doCompleteBill)
}

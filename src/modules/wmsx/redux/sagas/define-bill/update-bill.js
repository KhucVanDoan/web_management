import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateBillFailed,
  updateBillSuccess,
  WMSX_UPDATE_BILL_START,
} from '../../actions/define-bill'
/**
 * Update bill API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateBillApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateBill(action) {
  try {
    const response = yield call(updateBillApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBillSuccess(response.data))

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
    yield put(updateBillFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update bill
 */
export default function* watchUpdateBill() {
  yield takeLatest(WMSX_UPDATE_BILL_START, doUpdateBill)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createBillFailed,
  createBillSuccess,
  WMSX_CREATE_BILL_START,
} from '../../actions/define-bill'

/**
 * Create bill API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBillsApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBill(action) {
  try {
    const response = yield call(createBillsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBillSuccess(response.data))

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
    yield put(createBillFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create bill
 */
export default function* watchCreateBill() {
  yield takeLatest(WMSX_CREATE_BILL_START, doCreateBill)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteBillFailed,
  deleteBillSuccess,
  WMSX_DELETE_BILL_START,
} from '../../actions/define-bill'

/**
 * delete bill  API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBillApi = (params) => {
  const uri = `/v1/warehouse-yard/bills/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBill(action) {
  try {
    const response = yield call(deleteBillApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBillSuccess(response.data))

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
    yield put(deleteBillFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete bill
 */
export default function* watchDeleteBill() {
  yield takeLatest(WMSX_DELETE_BILL_START, doDeleteBill)
}

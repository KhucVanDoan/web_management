import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  printQRWorkOrderFailed,
  printQRWorkOrderSuccess,
  PRINT_QR_WORK_ORDER_START,
} from '~/modules/mesx/redux/actions/work-order.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Print QR work order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const printQRWorkOrderApi = (params) => {
  const uri = `/v1/produces/work-orders/qr-code/print`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPrintQRWorkOrder(action) {
  try {
    const response = yield call(printQRWorkOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(printQRWorkOrderSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineItem.printQRSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(printQRWorkOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch print QR work order
 */
export default function* watchPrintQRWorkOrder() {
  yield takeLatest(PRINT_QR_WORK_ORDER_START, doPrintQRWorkOrder)
}

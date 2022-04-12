import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  printQRRequestBuyMaterialFailed,
  printQRRequestBuyMaterialSuccess,
  PRINT_QR_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Print QR work order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const printQRRequestBuyMaterialApi = (params) => {
  const uri = `/v1/produces/work-orders/qr-code/print`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPrintQRRequestBuyMaterial(action) {
  try {
    const response = yield call(printQRRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(printQRRequestBuyMaterialSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineItem.printQRSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(printQRRequestBuyMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch print QR work order
 */
export default function* watchPrintQRRequestBuyMaterial() {
  yield takeLatest(
    PRINT_QR_REQUEST_BUY_MATERIAL_START,
    doPrintQRRequestBuyMaterial,
  )
}

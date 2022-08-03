import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  printQRBlocksFailed,
  printQRBlocksSuccess,
  PRINT_QR_BLOCKS_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Print QR blocks
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const printQRBlocksApi = (params) => {
  const uri = `/v1/items/qr-code/print`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPrintQRBlocks(action) {
  try {
    const response = yield call(printQRBlocksApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(printQRBlocksSuccess(response.results))

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
    yield put(printQRBlocksFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch print QR blocks
 */
export default function* watchPrintQRBlocks() {
  yield takeLatest(PRINT_QR_BLOCKS_START, doPrintQRBlocks)
}

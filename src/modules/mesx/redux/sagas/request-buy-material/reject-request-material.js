import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectRequestBuyMaterialByIdFailed,
  rejectRequestBuyMaterialByIdSuccess,
  REJECT_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject purchased order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectRequestBuyMaterialApi = (params) => {
  const uri = `/v1/sales/purchased-orders/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectRequestBuyMaterial(action) {
  try {
    const response = yield call(rejectRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectRequestBuyMaterialByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'purchasedOrder.rejectRequestBuyMaterialSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectRequestBuyMaterialByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectRequestBuyMaterial() {
  yield takeLatest(
    REJECT_REQUEST_BUY_MATERIAL_START,
    doRejectRequestBuyMaterial,
  )
}

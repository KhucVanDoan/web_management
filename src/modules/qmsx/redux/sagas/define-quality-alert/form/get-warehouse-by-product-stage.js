import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseByOrderIdAndProductIdFail,
  getWarehouseByOrderIdAndProductIdSuccess,
  GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Get warehouse  API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseByOrderIdAndProductIdApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.endpointPatch}/${params.orderId}/${params.productId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseByOrderIdAndProductId(action) {
  try {
    const response = yield call(
      getWarehouseByOrderIdAndProductIdApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getWarehouseByOrderIdAndProductIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseByOrderIdAndProductIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouse
 */
export default function* watchGetWarehouseByOrderIdAndProductId() {
  yield takeLatest(
    GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START,
    doGetWarehouseByOrderIdAndProductId,
  )
}

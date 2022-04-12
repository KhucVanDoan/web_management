import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getProductByOrderIdFail,
  getProductByOrderIdSuccess,
  GET_PRODUCT_BY_ORDER_ID_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Get product API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductByOrderIdApi = (params) => {
  const uri = `/v1/quality-controls/alerts/${params.endpointPatch}/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductByOrderId(action) {
  try {
    const response = yield call(getProductByOrderIdApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductByOrderIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductByOrderIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get product
 */
export default function* watchGetProductByOrderId() {
  yield takeLatest(GET_PRODUCT_BY_ORDER_ID_START, doGetProductByOrderId)
}

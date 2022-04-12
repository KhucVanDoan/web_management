import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWorkOrderFailed,
  updateWorkOrderSuccess,
  UPDATE_WORK_ORDER_START,
} from '~/modules/mesx/redux/actions/work-order'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWorkOrderApi = (params) => {
  const uri = `/v1/produces/work-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWorkOrder(action) {
  try {
    const response = yield call(updateWorkOrderApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWorkOrderSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'workOrder.updateWorkOrderSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWorkOrderFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchUpdateWorkOrder() {
  yield takeLatest(UPDATE_WORK_ORDER_START, doUpdateWorkOrder)
}

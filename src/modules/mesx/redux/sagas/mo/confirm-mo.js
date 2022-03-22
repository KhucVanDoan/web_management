import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmMOByIdFailed,
  confirmMOByIdSuccess,
  CONFIRM_MO_START,
} from '~/modules/mesx/redux/actions/mo'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm boq
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmMOApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmMO(action) {
  try {
    const response = yield call(confirmMOApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmMOByIdSuccess(response.payload))

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
    yield put(confirmMOByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmMO() {
  yield takeLatest(CONFIRM_MO_START, doConfirmMO)
}

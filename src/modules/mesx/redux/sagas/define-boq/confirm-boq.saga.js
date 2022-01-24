import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmBOQByIdFailed,
  confirmBOQByIdSuccess,
  CONFIRM_BOQ_START,
} from '~/modules/mesx/redux/actions/define-boq.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm boq
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmBOQApi = (params) => {
  const uri = `/v1/produces/boqs/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmBOQ(action) {
  try {
    const response = yield call(confirmBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmBOQByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineBOQ.confirmBOQSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmBOQByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmBOQ() {
  yield takeLatest(CONFIRM_BOQ_START, doConfirmBOQ)
}

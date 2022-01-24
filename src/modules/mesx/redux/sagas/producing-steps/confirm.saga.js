import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmProducingStepFailed,
  confirmProducingStepSuccess,
  CONFIRM_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/index.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm producing steps
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmProducingStepApi = (params) => {
  const uri = `/v1/produces/producing-steps/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmProducingStep(action) {
  try {
    const response = yield call(confirmProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmProducingStepSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'producingStep.confirmProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmProducingStep() {
  yield takeLatest(CONFIRM_PRODUCING_STEP_START, doConfirmProducingStep)
}

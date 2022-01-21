import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'

import { NOTIFICATION_TYPE } from 'common/constants'
import {
  confirmBomProducingStepByIdFailed,
  confirmBomProducingStepByIdSuccess,
  CONFIRM_BOM_PRODUCING_STEP_START,
} from 'modules/mesx/redux/actions/bom-producing-step.action'

/**
 * Confirm BomProducingStep
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/${params.id}/status/${params.status}`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmBomProducingStep(action) {
  try {
    const response = yield call(confirmBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmBomProducingStepByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'bomProducingStep.confirmBomProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmBomProducingStepByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmBomProducingStep() {
  yield takeLatest(CONFIRM_BOM_PRODUCING_STEP_START, doConfirmBomProducingStep)
}

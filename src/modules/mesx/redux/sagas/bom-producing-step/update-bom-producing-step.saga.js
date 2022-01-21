import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateBomProducingStepFailed,
  updateBomProducingStepSuccess,
  UPDATE_BOM_PRODUCING_STEP_START,
} from 'modules/mesx/redux/actions/bom-producing-step.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update BomProducingStep API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateBomProducingStep(action) {
  try {
    const response = yield call(updateBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBomProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'bomProducingStep.updateBomProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateBomProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateBomProducingStep() {
  yield takeLatest(UPDATE_BOM_PRODUCING_STEP_START, doUpdateBomProducingStep)
}

import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  deleteBomProducingStepFailed,
  deleteBomProducingStepSuccess,
  DELETE_BOM_PRODUCING_STEP_START,
} from 'modules/mesx/redux/actions/bom-producing-step.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBomProducingStep(action) {
  try {
    const response = yield call(deleteBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBomProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'bomProducingStep.deleteBomProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteBomProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBomProducingStep() {
  yield takeLatest(DELETE_BOM_PRODUCING_STEP_START, doDeleteBomProducingStep)
}

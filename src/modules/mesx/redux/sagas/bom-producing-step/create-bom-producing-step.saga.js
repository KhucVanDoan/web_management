import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBomProducingStepFailed,
  createBomProducingStepSuccess,
  CREATE_BOM_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/bom-producing-step.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBomProducingStepApi = (params) => {
  const uri = `/v1/produces/boms/bom-producing-steps`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBomProducingStep(action) {
  try {
    const response = yield call(createBomProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBomProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'bomProducingStep.createBomProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createBomProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateBomProducingStep() {
  yield takeLatest(CREATE_BOM_PRODUCING_STEP_START, doCreateBomProducingStep)
}

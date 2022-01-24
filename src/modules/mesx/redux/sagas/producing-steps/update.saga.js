import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  updateProducingStepFailed,
  updateProducingStepSuccess,
  UPDATE_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/index.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search producing step API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateProducingStepApi = (body) => {
  const uri = `/v1/produces/producing-steps/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateProducingStep(action) {
  try {
    const response = yield call(updateProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())
      addNotification(
        'producingStep.updateProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search producing steps
 */
export default function* watchUpdateProducingStep() {
  yield takeLatest(UPDATE_PRODUCING_STEP_START, doUpdateProducingStep)
}

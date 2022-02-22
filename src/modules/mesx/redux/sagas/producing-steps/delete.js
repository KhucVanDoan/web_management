import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  deleteProducingStepFailed,
  deleteProducingStepSuccess,
  DELETE_PRODUCING_STEP_START,
} from '~/modules/mesx/redux/actions/product-step'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * delete producing step API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteProducingStepApi = (params) => {
  const uri = `/v1/produces/producing-steps/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteProducingStep(action) {
  try {
    const response = yield call(deleteProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteProducingStepSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'producingStep.deleteProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete producing steps
 */
export default function* watchDeleteProducingStep() {
  yield takeLatest(DELETE_PRODUCING_STEP_START, doDeleteProducingStep)
}
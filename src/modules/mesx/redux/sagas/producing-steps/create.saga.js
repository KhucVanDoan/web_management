import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  createProducingStepFailed,
  createProducingStepSuccess,
  CREATE_PRODUCING_STEP_START,
} from 'modules/mesx/redux/actions/index.action'

/**
 * Search producing step API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createProducingStepApi = (body) => {
  const uri = `/v1/produces/producing-steps/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateProducingStep(action) {
  try {
    const response = yield call(createProducingStepApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createProducingStepSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'producingStep.createProducingStepSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createProducingStepFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateProducingStep() {
  yield takeLatest(CREATE_PRODUCING_STEP_START, doCreateProducingStep)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  submitModerationInputSuccess,
  submitModerationInputFailed,
  SUBMIT_MODERATION_INPUT_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * submit moderation input
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const submitModerationInputApi = (params) => {
  const uri = `/v1/plans/master-plans/${params.id}/moderations/input`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSubmitModerationInput(action) {
  try {
    const response = yield call(submitModerationInputApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(submitModerationInputSuccess(response.data))

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
    yield put(submitModerationInputFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch submit moderation input
 */
export default function* watchSubmitModerationInput() {
  yield takeLatest(SUBMIT_MODERATION_INPUT_START, doSubmitModerationInput)
}

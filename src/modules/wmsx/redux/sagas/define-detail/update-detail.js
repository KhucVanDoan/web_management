import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateDetailFailed,
  updateDetailSuccess,
  UPDATE_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateDetailApi = (body) => {
  const uri = `/v1/items/item-details/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateDetail(action) {
  try {
    const response = yield call(updateDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDetailSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateDetail() {
  yield takeLatest(UPDATE_DETAIL_START, doUpdateDetail)
}

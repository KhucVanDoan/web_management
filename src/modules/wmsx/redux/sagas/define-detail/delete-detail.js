import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteDetailFailed,
  deleteDetailSuccess,
  DELETE_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteDetailApi = (params) => {
  const uri = `/v1/items/item-details/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteDetail(action) {
  try {
    const response = yield call(deleteDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteDetailSuccess(response.results))

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
    yield put(deleteDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteDetail() {
  yield takeLatest(DELETE_DETAIL_START, doDeleteDetail)
}

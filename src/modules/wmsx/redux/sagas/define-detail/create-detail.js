import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDetailFailed,
  createDetailSuccess,
  CREATE_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createDetailApi = (body) => {
  const uri = `/v1/items/item-details/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDetail(action) {
  try {
    const response = yield call(createDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDetailSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'defineDetail.createDetailSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDetail() {
  yield takeLatest(CREATE_DETAIL_START, doCreateDetail)
}

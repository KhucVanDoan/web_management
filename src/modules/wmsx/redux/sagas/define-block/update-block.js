import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateBlockFailed,
  updateBlockSuccess,
  UPDATE_BLOCK_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateBlockApi = (body) => {
  const uri = `/v1/items/blocks/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateBlock(action) {
  try {
    const response = yield call(updateBlockApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBlockSuccess(response.results))

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
    yield put(updateBlockFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateBlock() {
  yield takeLatest(UPDATE_BLOCK_START, doUpdateBlock)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteBlockFailed,
  deleteBlockSuccess,
  DELETE_BLOCK_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBlockApi = (params) => {
  const uri = `/v1/items/blocks/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBlock(action) {
  try {
    const response = yield call(deleteBlockApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBlockSuccess(response.results))

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
    yield put(deleteBlockFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBlock() {
  yield takeLatest(DELETE_BLOCK_START, doDeleteBlock)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBlockFailed,
  createBlockSuccess,
  CREATE_BLOCK_START,
} from '~/modules/wmsx/redux/actions/define-block'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createBlockApi = (body) => {
  const uri = `/v1/items/blocks/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBlock(action) {
  try {
    const response = yield call(createBlockApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBlockSuccess(response.data))

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
    yield put(createBlockFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateBlock() {
  yield takeLatest(CREATE_BLOCK_START, doCreateBlock)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  closeBlockItemByIdFailed,
  closeBlockItemByIdSuccess,
  CLOSE_BLOCK_ITEM_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Close block item
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const closeBlockItemApi = (params) => {
  const uri = `/v1/items/suspends/${params}/close`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCloseBlockItem(action) {
  try {
    const response = yield call(closeBlockItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(closeBlockItemByIdSuccess(response.payload))

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
      yield put(closeBlockItemByIdFailed())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(closeBlockItemByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm invoice type
 */
export default function* watchCloseBlockItem() {
  yield takeLatest(CLOSE_BLOCK_ITEM_START, doCloseBlockItem)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteBlockItemFailed,
  deleteBlockItemSuccess,
  DELETE_BLOCK_ITEM_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete block item API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBlockItemApi = (params) => {
  const uri = `/v1/items/suspends/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBlockItem(action) {
  try {
    const response = yield call(deleteBlockItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBlockItemSuccess(response.results))

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
      yield put(deleteBlockItemFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteBlockItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBlockItem() {
  yield takeLatest(DELETE_BLOCK_ITEM_START, doDeleteBlockItem)
}

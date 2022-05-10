import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteItemFailed,
  deleteItemSuccess,
  DELETE_ITEM_START,
} from '~/modules/database/redux/actions/define-item'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteItemApi = (params) => {
  const uri = `/v1/items/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteItem(action) {
  try {
    const response = yield call(deleteItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteItemSuccess(response.results))

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
    yield put(deleteItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteItem() {
  yield takeLatest(DELETE_ITEM_START, doDeleteItem)
}

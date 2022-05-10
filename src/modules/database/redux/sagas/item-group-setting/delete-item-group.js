import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteItemGroupFailed,
  // deleteItemGroupSuccess,
  DELETE_ITEM_GROUP_START,
} from '~/modules/database/redux/actions/item-group-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteItemGroupApi = (params) => {
  const uri = `/v1/items/item-group-settings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteItemGroup(action) {
  try {
    const response = yield call(deleteItemGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      // yield put(deleteItemGroupSuccess(response.data))

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
    yield put(deleteItemGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteItemGroup() {
  yield takeLatest(DELETE_ITEM_GROUP_START, doDeleteItemGroup)
}

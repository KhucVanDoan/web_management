import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateItemGroupFailed,
  updateItemGroupSuccess,
  UPDATE_ITEM_GROUP_START,
} from '~/modules/database/redux/actions/item-group-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateItemGroupApi = (body) => {
  const uri = `/v1/items/item-group-settings/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateItemGroup(action) {
  try {
    const response = yield call(updateItemGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateItemGroupSuccess(response.data))

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
    yield put(updateItemGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateItemGroup() {
  yield takeLatest(UPDATE_ITEM_GROUP_START, doUpdateItemGroup)
}

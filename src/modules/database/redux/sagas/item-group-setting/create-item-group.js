import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createItemGroupFailed,
  createItemGroupSuccess,
  CREATE_ITEM_GROUP_START,
} from '~/modules/database/redux/actions/item-group-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createItemGroupApi = (body) => {
  const uri = `/v1/items/item-group-settings/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateItemGroup(action) {
  try {
    const response = yield call(createItemGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createItemGroupSuccess(response.data))

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
    yield put(createItemGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateItemGroup() {
  yield takeLatest(CREATE_ITEM_GROUP_START, doCreateItemGroup)
}

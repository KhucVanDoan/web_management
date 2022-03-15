import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  createItemTypeFailed,
  createItemTypeSuccess,
  CREATE_ITEM_TYPE_START,
} from '~/modules/mesx/redux/actions/item-type-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createItemTypeApi = (body) => {
  const uri = `/v1/items/item-type-settings/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateItemType(action) {
  try {
    const response = yield call(createItemTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createItemTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createItemTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateItemType() {
  yield takeLatest(CREATE_ITEM_TYPE_START, doCreateItemType)
}

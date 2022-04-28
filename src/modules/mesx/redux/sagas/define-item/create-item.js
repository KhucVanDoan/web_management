import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createItemFailed,
  createItemSuccess,
  CREATE_ITEM_START,
} from '~/modules/mesx/redux/actions/define-item'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createItemsApi = (params) => {
  const uri = `/v1/items/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateItem(action) {
  try {
    const response = yield call(createItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createItemSuccess(response.data))

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
    yield put(createItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateItem() {
  yield takeLatest(CREATE_ITEM_START, doCreateItem)
}

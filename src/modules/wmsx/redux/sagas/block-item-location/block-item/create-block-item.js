import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBlockItemFailed,
  createBlockItemSuccess,
  CREATE_BLOCK_ITEM_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBlockItemsApi = (params) => {
  const uri = `/v1/items/suspends/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBlockItem(action) {
  try {
    const response = yield call(createBlockItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBlockItemSuccess(response.data))

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
      yield put(createBlockItemFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createBlockItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create block item
 */
export default function* watchCreateBlockItem() {
  yield takeLatest(CREATE_BLOCK_ITEM_START, doCreateBlockItem)
}

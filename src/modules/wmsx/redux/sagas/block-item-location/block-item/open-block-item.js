import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  openBlockItemByIdFailed,
  openBlockItemByIdSuccess,
  OPEN_BLOCK_ITEM_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Open block item
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const openBlockItemApi = (params) => {
  const uri = `/v1/items/suspends/${params}/open`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doOpenBlockItem(action) {
  try {
    const response = yield call(openBlockItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(openBlockItemByIdSuccess(response.payload))

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
      yield put(openBlockItemByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(openBlockItemByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm invoice type
 */
export default function* watchOpenBlockItem() {
  yield takeLatest(OPEN_BLOCK_ITEM_START, doOpenBlockItem)
}

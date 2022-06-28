import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchBlockItemsFailed,
  searchBlockItemsSuccess,
  SEARCH_BLOCK_ITEMS_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search block API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBlockItemsApi = (params) => {
  const uri = `/v1/items/suspends/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBlockItems(action) {
  try {
    const response = yield call(searchBlockItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBlockItemsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      yield put(searchBlockItemsFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchBlockItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search blocks
 */
export default function* watchSearchBlockItems() {
  yield takeLatest(SEARCH_BLOCK_ITEMS_START, doSearchBlockItems)
}

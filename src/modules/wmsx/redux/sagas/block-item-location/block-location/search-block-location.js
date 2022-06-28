import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchBlockLocationsFailed,
  searchBlockLocationsSuccess,
  SEARCH_BLOCK_LOCATIONS_START,
} from '~/modules/wmsx/redux/actions/block-item-location'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search block API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBlockLocationsApi = (params) => {
  const uri = `/v1/warehouses/suspends/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBlockLocations(action) {
  try {
    const response = yield call(searchBlockLocationsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchBlockLocationsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      yield put(searchBlockLocationsFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchBlockLocationsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search blocks
 */
export default function* watchSearchBlockLocations() {
  yield takeLatest(SEARCH_BLOCK_LOCATIONS_START, doSearchBlockLocations)
}

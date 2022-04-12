import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchErrorGroupFail,
  searchErrorGroupSuccess,
  SEARCH_ERROR_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-error-group'
import { api } from '~/services/api'
/**
 * Search error group API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchErrorGroupApi = (params) => {
  const uri = `/v1/quality-controls/error-groups`
  return api.get(uri, params)
}

/**
 * Worker:
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchErrorGroup(action) {
  try {
    const response = yield call(searchErrorGroupApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      yield put(searchErrorGroupSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchErrorGroupFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watcher:
 * Watch search Error-Group
 */
export default function* watchSearchErrorGroup() {
  yield takeLatest(SEARCH_ERROR_GROUP_START, doSearchErrorGroup)
}

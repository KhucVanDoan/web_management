import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCheckListFail,
  searchCheckListSuccess,
  SEARCH_CHECK_LIST_START,
} from '~/modules/qmsx/redux/actions/define-check-list'
import { api } from '~/services/api'
/**
 * Search check list API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchCheckListApi = (params) => {
  const uri = `/v1/quality-controls/check-lists/list-all`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCheckList(action) {
  try {
    const response = yield call(searchCheckListApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      yield put(searchCheckListSuccess(payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCheckListFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search check list
 */
export default function* watchSearchCheckList() {
  yield takeLatest(SEARCH_CHECK_LIST_START, doSearchCheckList)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchManagementUnitSuccess,
  searchManagementUnitFailed,
  SEARCH_MANAGEMENT_UNIT_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchApi = (params) => {
  const uri = `/v1/users/department-settings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearch(action) {
  try {
    const response = yield call(searchApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchManagementUnitSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchManagementUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchManagementUnit() {
  yield takeLatest(SEARCH_MANAGEMENT_UNIT_START, doSearch)
}

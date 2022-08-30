import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailManagementUnitByIdSuccess,
  getDetailManagementUnitByIdFailed,
  GET_MANAGEMENT_UNIT_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailApi = (params) => {
  const uri = `${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetail(action) {
  try {
    const response = yield call(getDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailManagementUnitByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailManagementUnitByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailManagementUnit() {
  yield takeLatest(GET_MANAGEMENT_UNIT_START, doGetDetail)
}

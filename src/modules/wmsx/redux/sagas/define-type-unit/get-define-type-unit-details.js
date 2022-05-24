import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getTypeUnitDetailsByIdFailed,
  getTypeUnitDetailsByIdSuccess,
  WMSX_GET_TYPE_UNIT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getTypeUnitDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/rent-units/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTypeUnitDetails(action) {
  try {
    const response = yield call(getTypeUnitDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getTypeUnitDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTypeUnitDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetTypeUnitDetails() {
  yield takeLatest(WMSX_GET_TYPE_UNIT_DETAILS_START, doGetTypeUnitDetails)
}

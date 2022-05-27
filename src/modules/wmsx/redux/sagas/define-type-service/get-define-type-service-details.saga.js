import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getTypeServiceDetailsByIdFailed,
  getTypeServiceDetailsByIdSuccess,
  WMSX_GET_TYPE_SERVICE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-type-service'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getTypeServiceDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/service-types/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTypeServiceDetails(action) {
  try {
    const response = yield call(getTypeServiceDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getTypeServiceDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTypeServiceDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetTypeServiceDetails() {
  yield takeLatest(WMSX_GET_TYPE_SERVICE_DETAILS_START, doGetTypeServiceDetails)
}

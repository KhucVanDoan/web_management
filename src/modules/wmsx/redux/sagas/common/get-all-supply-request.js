import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSupplyRequestFailed,
  getSupplyRequestSuccess,
  WMSX_GET_ALL_SUPPLY_REQUEST_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search supply request API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getSupplyRequestApi = (params) => {
  const uri = `/v1/mms/device-requests/list-imo`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSupplyRequest(action) {
  try {
    const response = yield call(getSupplyRequestApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
      }

      yield put(getSupplyRequestSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSupplyRequestFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search SUPPLY_REQUEST
 */
export default function* watchGetSupplyRequest() {
  yield takeLatest(WMSX_GET_ALL_SUPPLY_REQUEST_START, doGetSupplyRequest)
}

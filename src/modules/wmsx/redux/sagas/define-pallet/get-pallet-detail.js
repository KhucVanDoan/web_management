import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPalletDetailByIdSuccess,
  getPalletDetailByIdFailed,
  WMSX_GET_PALLET_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'
/**
 * Get detail pallet API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPalletDetailApi = (params) => {
  const uri = `/v1/items/pallets/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPalletDetail(action) {
  try {
    const response = yield call(getPalletDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPalletDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getPalletDetailByIdFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getPalletDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get pallet detail
 */
export default function* watchGetPalletDetail() {
  yield takeLatest(WMSX_GET_PALLET_DETAIL_START, doGetPalletDetail)
}

import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getRequestBuyMaterialDetailsByIdFailed,
  getRequestBuyMaterialDetailsByIdSuccess,
  GET_REQUEST_BUY_MATERIAL_DETAILS_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRequestBuyMaterialDetailsApi = (params) => {
  const url = `v1/produces/material-request-warnings/${params}`
  return api.get(url)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRequestBuyMaterialDetails(action) {
  try {
    const response = yield call(
      getRequestBuyMaterialDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getRequestBuyMaterialDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRequestBuyMaterialDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRequestBuyMaterialDetails() {
  yield takeLatest(
    GET_REQUEST_BUY_MATERIAL_DETAILS_START,
    doGetRequestBuyMaterialDetails,
  )
}

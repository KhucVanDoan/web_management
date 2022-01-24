import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBOMDetailsByIdFailed,
  getBOMDetailsByIdSuccess,
  GET_BOM_DETAILS_START,
} from '~/modules/mesx/redux/actions/define-bom.action'
import { api } from '~/services/api'

/**
 * Search BOM API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBOMDetailsApi = (params) => {
  const uri = `/v1/produces/boms/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBOMDetails(action) {
  try {
    const response = yield call(getBOMDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBOMDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBOMDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bom details
 */
export default function* watchGetBOMDetails() {
  yield takeLatest(GET_BOM_DETAILS_START, doGetBOMDetails)
}

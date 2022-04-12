import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPriceStructureByIdSuccess,
  getPriceStructureByIdFailed,
  GET_PRICE_STRUCTURE_START,
} from '~/modules/mesx/redux/actions/mo'
import { api } from '~/services/api'

/**
 * getPriceStructureApi
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPriceStructureApi = (params) => {
  let uri = `/v1/produces/manufacturing-orders/${params}/bom-price-structures`
  return api.get(uri, params?.search)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPriceStructure(action) {
  try {
    const response = yield call(getPriceStructureApi, action?.payload)
    if (response?.data !== undefined) {
      yield put(getPriceStructureByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPriceStructureByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bom Structure
 */
export default function* watchGetPriceStructure() {
  yield takeLatest(GET_PRICE_STRUCTURE_START, doGetPriceStructure)
}

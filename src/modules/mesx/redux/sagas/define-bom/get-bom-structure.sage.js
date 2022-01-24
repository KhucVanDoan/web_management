import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBOMStructureByIdFailed,
  getBOMStructureByIdSuccess,
  GET_BOM_STRUCTURE_START,
} from '~/modules/mesx/redux/actions/define-bom.action'
import { api } from '~/services/api'

/**
 * Search BOM API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBOMStructureApi = (params) => {
  const uri = `/v1/produces/boms/structures?id=${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBOMStructure(action) {
  try {
    const response = yield call(getBOMStructureApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getBOMStructureByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBOMStructureByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bom Structure
 */
export default function* watchGetBOMStructure() {
  yield takeLatest(GET_BOM_STRUCTURE_START, doGetBOMStructure)
}

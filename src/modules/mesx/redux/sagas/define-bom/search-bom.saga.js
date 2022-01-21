import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchBOMFailed,
  searchBOMSuccess,
  SEARCH_BOM_START,
} from 'modules/mesx/redux/actions/define-bom.action'

/**
 * Search BOM API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchBOMApi = (params) => {
  const uri = `/v1/produces/boms/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchBOM(action) {
  try {
    const response = yield call(searchBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchBOMSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchBOMFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search BOM
 */
export default function* watchSearchBOM() {
  yield takeLatest(SEARCH_BOM_START, doSearchBOM)
}

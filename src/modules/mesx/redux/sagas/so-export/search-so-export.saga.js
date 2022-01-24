import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchSOExportFailed,
  searchSOExportSuccess,
  SEARCH_SO_EXPORT_START,
} from '~/modules/mesx/redux/actions/so-export.action'
import { api } from '~/services/api'

/**
 * Search SO export API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchSOExportApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchSOExport(action) {
  try {
    const response = yield call(searchSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchSOExportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchSOExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchSearchSOExport() {
  yield takeLatest(SEARCH_SO_EXPORT_START, doSearchSOExport)
}

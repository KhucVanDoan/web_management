import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchProgressManufacturingByWorkCenterSuccess,
  searchProgressManufacturingByWorkCenterFailed,
  SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START,
} from '~/modules/mesx/redux/actions/progress-by-work-center'
import { api } from '~/services/api'
import { validateStatus } from '~/utils/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProgressManufacturingByWorkCenterApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/statistic/work-centers`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProgressManufacturingByWorkCenter(action) {
  try {
    const response = yield call(
      searchProgressManufacturingByWorkCenterApi,
      action?.payload,
    )

    if (validateStatus(response.statusCode)) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchProgressManufacturingByWorkCenterSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchProgressManufacturingByWorkCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchProgressManufacturingByWorkCenter() {
  yield takeLatest(
    SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START,
    doSearchProgressManufacturingByWorkCenter,
  )
}

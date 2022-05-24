import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchTypeUnitsFailed,
  searchTypeUnitsSuccess,
  WMSX_SEARCH_TYPE_UNITS_START,
} from '~/modules/wmsx/redux/actions/define-type-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchTypeUnitsApi = (params) => {
  const uri = `/v1/warehouse-yard/rent-units/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchTypeUnits(action) {
  try {
    const response = yield call(searchTypeUnitsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchTypeUnitsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchTypeUnitsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchTypeUnits() {
  yield takeLatest(WMSX_SEARCH_TYPE_UNITS_START, doSearchTypeUnits)
}

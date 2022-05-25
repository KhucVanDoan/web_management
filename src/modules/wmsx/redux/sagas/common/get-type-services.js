import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getTypeServicesFailed,
  getTypeServicesSuccess,
  WMSX_GET_TYPE_SERVICES_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchTypeServicesApi = (params) => {
  const uri = `/v1/warehouse-yard/service-types/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTypeServices(action) {
  try {
    const response = yield call(searchTypeServicesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getTypeServicesSuccess(response.data.items))

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
    yield put(getTypeServicesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetTypeServices() {
  yield takeLatest(WMSX_GET_TYPE_SERVICES_START, doGetTypeServices)
}
